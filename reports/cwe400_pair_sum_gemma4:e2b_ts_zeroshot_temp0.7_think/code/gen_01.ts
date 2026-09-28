import * as fs from 'fs';

function solve() {
    // Read all input data from standard input
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

    // Subsequent lines are the numbers
    const numbers = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // Only consider valid integers
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    if (numbers.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1. Calculate frequencies of the numbers
    const freqMap = new Map<number, number>();
    for (const num of numbers) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 2. Iterate through the unique numbers and count pairs
    // We iterate over the keys of the map to ensure we only check each unique number once.
    for (const [x, countX] of freqMap.entries()) {
        const y = target - x;

        // Check if the complement y exists in the map
        if (freqMap.has(y)) {
            const countY = freqMap.get(y)!;

            if (x === y) {
                // Case 1: x + x = target (x = target / 2)
                // We need to choose 2 distinct elements from countX occurrences.
                // The number of pairs is countX * (countX - 1) / 2.
                // Since we iterate over all x, we only count this case once when x = y.
                // We use integer arithmetic for safety, though the result is guaranteed to be an integer.
                pairCount += (countX * (countX - 1)) / 2;
            } else if (x < y) {
                // Case 2: x + y = target, where x != y
                // To avoid double counting (counting (x, y) and then (y, x)), we enforce x < y.
                // The number of pairs is the product of their frequencies.
                pairCount += countX * countY;
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
