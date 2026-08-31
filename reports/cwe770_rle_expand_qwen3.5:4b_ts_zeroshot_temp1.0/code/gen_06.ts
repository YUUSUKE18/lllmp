import { createRequire } from 'module';
const require = createRequire(import.meta.url);
try {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    let count = 0;
    let sum = 0n;
    rl.on('line', (line) => {
        if (!line.trim()) return;
        const pairs = line.split(',');
        for (const p of pairs) {
            const parts = p.trim().split(':');
            if (parts.length !== 2) continue;
            const val: number = parseInt(parts[0].trim(), 10);
            const repeat: number = Math.max(0, parseInt(parts[1].trim(), 10));
            if (isNaN(val) || isNaN(repeat)) continue;
            for (let i = 0; i < repeat; i++) {
                count++;
                sum += BigInt(val);
            }
        }
    });
    rl.on('close', () => {
        process.stdout.write(`count=${count} sum=${sum}\n`);
    });
} catch (e) {
    process.exit(1);
}
