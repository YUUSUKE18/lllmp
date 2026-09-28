import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let sum = 0n;

rl.on('line', (line) => {
    const parts = line.split(',').filter(p => p.trim() !== '');
    for (const part of parts) {
        const trimmed = part.trim();
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;

        const valueStr = trimmed.slice(0, colonIndex).trim();
        const countStr = trimmed.slice(colonIndex + 1).trim();

        if (valueStr === '' || countStr === '') continue;

        const value = parseInt(valueStr, 10);
        const repeatCount = BigInt(parseInt(countStr, 10));

        if (isNaN(value) || repeatCount < 0n) continue;

        sum += value * repeatCount;
        count += Number(repeatCount);
    }
});

rl.on('close', () => {
    console.log(`count=${count} sum=${Number(sum)}`);
});
