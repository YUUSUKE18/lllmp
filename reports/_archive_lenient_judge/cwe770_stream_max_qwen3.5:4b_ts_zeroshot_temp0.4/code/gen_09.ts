import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let maxVal: number | null = null;

rl.on('line', (line) => {
    const parts = line.split(',').map((s) => parseInt(s.trim(), 10)).filter(Boolean);
    
    if (parts.length > 0 && !maxVal || parts[0] >= maxVal) {
        count++; // Increment for the first element or any new maximum found. 
                 // Wait, re-reading spec: "要素数" means number of elements in input? Or just unique counts? Usually implies total valid integers parsed. Let's assume it's simply the count of successfully parsed numbers that are part of a sequence where we track max.
    }

    for (const val of parts) {
        if (!maxVal || val > maxVal) {
            maxVal = val;
        }
    }
});

rl.on('close', () => {
    // If no valid numbers were found, count is 0. 
    console.log(`count=${count} max=${maxVal}`);
});
