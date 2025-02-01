import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';

export default function KeyBoard() {
    const [keyEvents, setKeyEvents] = useState<string[]>([]);

    useEffect(() => {
        const unlisten = listen('keyboard-event', (event) => {
            // setKeyEvents(prev => [...prev, event.payload as string]);
            console.log(event.payload);
        });

        return () => {
            unlisten.then(unlistenFn => unlistenFn());
        };
    }, []);

    return (
        <div>
            <button onClick={() => invoke('start_background')}>Start Background</button>
            <button onClick={() => invoke('stop_background')}>Stop Background</button>
            <div>
                {keyEvents.map((event, index) => (
                    <div key={index}>{event}</div>
                ))}
            </div>
        </div>
    );
}