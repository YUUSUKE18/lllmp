import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // The first line is the target value T
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const T = parseInt(targetLine, 10);

    // Parse the remaining lines as numbers A
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // Check if it's a valid integer
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 1. Create a frequency map for the numbers
    const freqMap = new Map<number, number>();
    for (const num of numbers) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 2. Iterate through the unique numbers in the map to find pairs
    // We iterate over the keys to ensure we only process each unique number once.
    const uniqueNumbers = Array.from(freqMap.keys()).sort((a, b) => a - b);

    for (const x of uniqueNumbers) {
        const y = T - x;

        if (freqMap.has(y)) {
            const countX = freqMap.get(x)!;
            const countY = freqMap.get(y)!;

            if (x === y) {
                // Case 1: x + x = T (e.g., T=10, x=5). We need pairs of the same number.
                // Number of pairs = n * (n - 1) / 2
                pairCount += countX * (countX - 1) / 2;
            } else if (x < y) {
                // Case 2: x + y = T, where x != y. We count the product of their frequencies.
                // Since we iterate in sorted order, we only count (x, y) once (when x < y).
                pairCount += countX * countY;
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
