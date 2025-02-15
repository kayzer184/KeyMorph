// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::process::{Command, Child};
use std::sync::Mutex;
use std::sync::Arc;
use tauri::Emitter;
use std::io::{BufRead, BufReader};
use tauri::Window;
use tauri::Manager;
use tauri::Theme;
use std::process::Stdio;

// Храним ID процесса
static BACKGROUND_PROCESS: once_cell::sync::Lazy<Arc<Mutex<Option<Child>>>> = 
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));

#[tauri::command]
async fn start_background(app: tauri::AppHandle) -> Result<(), String> {
    let mut process = BACKGROUND_PROCESS.lock().map_err(|e| e.to_string())?;
    
    if process.is_some() {
        return Ok(());
    }

    let mut child = Command::new(std::env::current_exe()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("Failed to get parent dir")?
        .join("background_process"))
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;

    let stdout = child.stdout.take().expect("Failed to get stdout");
    let app_handle = app.clone();

    std::thread::spawn(move || {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            if let Ok(line) = line {
                app_handle
                    .emit("key-event", line)
                    .unwrap_or_else(|e| eprintln!("Failed to emit event: {}", e));
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

#[tauri::command]
async fn overlay_run(app: tauri::AppHandle) {
    let monitor = app.primary_monitor().unwrap().unwrap();
    let size = monitor.size();

    let _ = tauri::WebviewWindowBuilder::new(
        &app, 
        "overlay", 
        tauri::WebviewUrl::App("overlay.html".into())
    )
    .title("KeyMorph Overlay")
    .inner_size(size.width as f64, size.height as f64)
    .position(0.0, 0.0)
    .resizable(false)
    .decorations(false)
    .always_on_top(true)
    .transparent(true)
    .shadow(false)
    .skip_taskbar(true)
    .visible(true)   
    .focused(false)      
    .build()
    .unwrap()
    .set_ignore_cursor_events(true);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut ctx = tauri::generate_context!();
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_prevent_default::init())
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window.set_title("KeyMorph").unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![start_background, stop_background, overlay_run])
        .build(ctx)
        .expect("error while building tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
