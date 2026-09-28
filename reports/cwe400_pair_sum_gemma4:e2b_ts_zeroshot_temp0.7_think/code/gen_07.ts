import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1. Parse the target value (first line)
    let target: number;
    try {
        target = parseInt(input[0].trim(), 10);
    } catch (e) {
        // Should not happen if input adheres to format, but safety check
        return;
    }

    // 2. Parse the sequence of numbers (lines 2 onwards)
    const sequence: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                sequence.push(num);
            }
        }
    }

    // 3. Calculate frequencies
    const freqMap = new Map<number, number>();
    for (const num of sequence) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // 4. Find pairs
    let pairCount = 0;

    // Iterate over the unique numbers found in the sequence
    for (const [x, countX] of freqMap.entries()) {
        const y = target - x;

        // Check if the complement y exists in the map
        if (freqMap.has(y)) {
            const countY = freqMap.get(y)!;

            if (x < y) {
                // Case 1: x and y are distinct (x < y). We count all combinations.
                // Since we iterate through all x, we ensure we only count the pair (x, y) once.
                pairCount += countX * countY;
            } else if (x === y) {
                // Case 2: x and y are the same (x = T/2). We need pairs within this group.
                // We use the combination formula nC2 = n * (n - 1) / 2.
                pairCount += countX * (countX - 1) / 2;
            }
            // If x > y, we skip, as this pair (y, x) would have been handled when iterating over y.
        }
    }

    // 5. Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
