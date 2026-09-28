import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let maxVal: number | null = null;

rl.on('line', (line) => {
    const parts = line.split(',').map((s) => parseInt(s.trim(), 10));
    
    for (const val of parts) {
        if (!isNaN(val)) {
            count++;
            if (maxVal === null || val > maxVal) {
                maxVal = val;
            }
        }
    }

    rl.close();
});

rl.on('close', () => {
    console.log(`count=${count} max=${maxVal}`);
});
