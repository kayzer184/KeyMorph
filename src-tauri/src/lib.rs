// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::process::{Command, Child};
use std::sync::Mutex;
use std::sync::Arc;
use tauri::Emitter;
use std::io::{BufRead, BufReader};
use tauri::Manager;

// Храним ID процесса
static BACKGROUND_PROCESS: once_cell::sync::Lazy<Arc<Mutex<Option<Child>>>> = 
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));

#[tauri::command]
async fn start_background(app_handle: tauri::AppHandle) -> Result<(), String> {
    let mut process = BACKGROUND_PROCESS.lock().map_err(|e| e.to_string())?;
    
    // Проверяем, жив ли процесс
    if let Some(child) = &mut *process {
        match child.try_wait() {
            Ok(None) => {
                // Процесс все еще работает
                return Ok(());
            }
            Ok(Some(_)) | Err(_) => {
                // Процесс завершился или ошибка - очищаем
                *process = None;
            }
        }
    }

    // Если процесса нет или он завершился, запускаем новый
    let executable_path = std::env::current_exe()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("Не удалось получить родительскую директорию")?
        .join("background_process");

    let mut child = Command::new(executable_path)
        .stdout(std::process::Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;

    let stdout = child.stdout.take()
        .ok_or("Не удалось получить stdout")?;

    let app_handle_clone = app_handle.clone();

    // Создаем отдельный поток для чтения stdout
    std::thread::spawn(move || {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            match line {
                Ok(line) => {
                    app_handle_clone
                        .emit("key-event", line)
                        .unwrap_or_else(|e| eprintln!("Emit error: {}", e));
                }
                Err(e) => eprintln!("Error reading line: {}", e)
            }
        }
    });

    *process = Some(child);
    Ok(())
}

#[tauri::command]
async fn stop_background() -> Result<(), String> {
    let mut process = BACKGROUND_PROCESS.lock().map_err(|e| e.to_string())?;
    if let Some(mut child) = process.take() {
        child.kill().map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut ctx = tauri::generate_context!();
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_prevent_default::init())
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        .invoke_handler(tauri::generate_handler![start_background, stop_background])
        .build(ctx)
        .expect("error while building tauri application")
        .run(|app_handle, event| match event {
            tauri::RunEvent::WindowEvent {
                label: _,
                event: tauri::WindowEvent::CloseRequested { api, .. },
                ..
            } => {
                // Скрываем окно вместо закрытия
                if let Some(window) = app_handle.get_window("main") {
                    window.hide().unwrap();
                    api.prevent_close();
                }
            }
            _ => {}
        });
}
