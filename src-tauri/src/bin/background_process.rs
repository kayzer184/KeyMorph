#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{thread, time::Duration};
use key_director::DeviceState;
use serde_json::json;

fn main() {
    let device_state = DeviceState::new();
    loop {
        let key_events = device_state.query_keymap();
        for event in key_events {
            let data = json!({
                "char": event.char.map(|c| c.to_string()),
                "keyCode": event.key_code,
                "scanCode": event.scan_code,
                "isPressed": event.is_pressed
            });
            
            println!("{}", data);
        }
        thread::sleep(Duration::from_millis(10));
    }
}