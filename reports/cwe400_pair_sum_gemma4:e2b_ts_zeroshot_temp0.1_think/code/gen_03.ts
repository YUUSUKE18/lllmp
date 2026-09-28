import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // Line 1 is the target value T
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const T = parseInt(targetLine, 10);

    // Parse the rest of the lines as numbers
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    if (numbers.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1. Create a frequency map of the numbers
    const freqMap = new Map<number, number>();
    for (const num of numbers) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 2. Iterate through the unique numbers in the map to find pairs
    // We iterate over the keys to ensure we only process each unique value once.
    const uniqueNumbers = Array.from(freqMap.keys()).sort((a, b) => a - b);

    for (const x of uniqueNumbers) {
        const y = T - x;

        if (freqMap.has(y)) {
            const countX = freqMap.get(x)!;
            const countY = freqMap.get(y)!;

            if (x === y) {
                // Case 1: x + x = T (e.g., 3 + 3 = 6). We need pairs of indices (i, j) where i != j.
                // If there are k occurrences of x, the number of pairs is k * (k - 1) / 2.
                pairCount += countX * (countX - 1) / 2;
            } else if (x < y) {
                // Case 2: x + y = T, where x != y. We count all combinations of indices.
                // Since we iterate x < y, we avoid double counting (we don't need to check y < x).
                pairCount += countX * countY;
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
