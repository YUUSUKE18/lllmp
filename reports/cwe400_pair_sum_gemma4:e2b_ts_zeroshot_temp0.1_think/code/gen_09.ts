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
    const target = parseInt(targetLine, 10);

    // The rest of the lines contain the sequence of numbers
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

    if (sequence.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1. Calculate frequencies of all numbers
    const counts = new Map<number, number>();
    for (const num of sequence) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 2. Iterate through the unique numbers to find pairs
    // We iterate over the keys of the map to avoid redundant checks
    const uniqueNumbers = Array.from(counts.keys());

    for (const x of uniqueNumbers) {
        const y = target - x;

        if (counts.has(y)) {
            const countX = counts.get(x)!;
            const countY = counts.get(y)!;

            if (x === y) {
                // Case 1: x + x = target (e.g., 4 + 4 = 8)
                // We need to choose 2 elements from countX occurrences: C(countX, 2)
                // C(n, 2) = n * (n - 1) / 2
                pairCount += countX * (countX - 1) / 2;
            } else if (x < y) {
                // Case 2: x + y = target, where x != y
                // To avoid double counting (e.g., counting (x, y) and then (y, x)),
                // we only process pairs where x is strictly less than y.
                // We check if y exists and add the product of their frequencies.
                pairCount += countX * countY;
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
