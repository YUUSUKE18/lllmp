import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

try {
    const numbers = new Set<number>();
    
    for (const part of input.split(',').map(s => s.trim()).filter(s => s !== '')) {
        if (/^-?\d+$/.test(part)) {
            const num = parseInt(part, 10);
            if (!isNaN(num)) {
                numbers.add(num);
            }
        }
    }

    let sum: bigint;
    for (const n of numbers) {
        // JavaScript の Number は安全な整数範囲で動作するため、BigInt で足算しつつ BigInt として保持する。
        if (sum === undefined) {
            sum = BigInt(n);
        } else {
            sum += BigInt(n);
        }
    }

    const count = numbers.size;
    
    console.log(`count=${count} sum=${Number(sum)}`);
} catch (e) {
    process.exit(1);
}
