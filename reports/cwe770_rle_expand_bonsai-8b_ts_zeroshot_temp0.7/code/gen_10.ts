import { Readable } from 'stream';

const input = process.stdin;

function parseAndProcess() {
    let data = '';
    let elements = [];

    for await (const chunk of input) {
        data += chunk;
    }

    const parts = data.split(',').filter(part => part.trim() !== '');

    for (const part of parts) {
        const [value, count] = part.split(':').map(Number);
        if (value === 0 || count === 0) continue;

        if (value > 64000000000 || count > 64000000000) continue;

        for (let i = 0; i < count; i++) {
            elements.push(value);
        }
    }

    const count = elements.length;
    const sum = elements.reduce((acc, val) => acc + val, 0);

    console.log(`count=${count} sum=${sum}`);
}

parseAndProcess();
