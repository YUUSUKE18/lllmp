import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const parts: number[] = [];
    for (const part of input.split(',')) {
        if (/^-?\d+$/.test(part.trim())) {
            parts.push(parseInt(part, 10));
        }
    }

    let count = parts.length;
    let maxVal = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < count; i++) {
        if (!parts[i]) continue;
        const val = parseInt(parts[i], 10);
        if (val > maxVal) {
            maxVal = val;
        }
    }

    console.log('count=' + count + ' max=' + maxVal);
}
