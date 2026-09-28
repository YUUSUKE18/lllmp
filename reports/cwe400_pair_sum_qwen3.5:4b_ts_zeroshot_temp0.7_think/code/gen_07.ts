const { createInterface } = require('readline');
const rl = createInterface({ input: process.stdin });

let targetValue: bigint | null = null;
const frequencyMap = new Map<bigint, bigint>();
let totalPairs: bigint = 0n;

rl.on('line', (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Check if the line contains a valid integer string
    const match = trimmed.match(/^-?\d+$/);
    if (!match) return;

    const val = BigInt(trimmed);

    if (targetValue === null) {
        // First valid integer is the target value
        targetValue = val;
    } else {
        // Process as a candidate number for pairs
        const needed = targetValue - val;
        if (frequencyMap.has(needed)) {
            totalPairs += frequencyMap.get(needed)!;
        }
        const currentCount = frequencyMap.get(val) || 0n;
        frequencyMap.set(val, currentCount + 1n);
    }
});

rl.on('close', () => {
    process.stdout.write(`pairs=${totalPairs}\n`);
});
