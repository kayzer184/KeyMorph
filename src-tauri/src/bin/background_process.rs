#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io::{self, Write}};
use key_director::{DeviceQuery, DeviceState};
use serde_json::json;

fn main() {
    let device_state = DeviceState::new();
    
    let _guard = device_state.subscribe_keys(|keys| {
        if !keys.is_empty() {
            for key in keys {
                let event = json!({
                    "char": key.char,
                    "keyCode": key.key_code,
                    "scanCode": key.scan_code,
                    "isPressed": key.is_pressed
                });
                
                println!("{}", serde_json::to_string(&event).unwrap());
                io::stdout().flush().unwrap();
            }
        }
    });

    loop {
        std::thread::sleep(std::time::Duration::from_millis(10));
    }
}