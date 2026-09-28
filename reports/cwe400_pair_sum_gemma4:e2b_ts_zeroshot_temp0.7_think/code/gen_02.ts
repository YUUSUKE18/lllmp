import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        // No input provided
        return;
    }

    // The first line is the target value
    const targetLine = input[0].trim();
    if (!targetLine) {
        // Target line is empty
        return;
    }
    const target = parseInt(targetLine, 10);

    // The rest of the lines are the numbers
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

    // 1. Build frequency map
    const freqMap = new Map<number, number>();
    for (const num of numbers) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 2. Calculate pairs
    // Iterate over the unique numbers present in the map
    for (const [x, countX] of freqMap.entries()) {
        const y = target - x;

        // Check if y exists in the map
        if (freqMap.has(y)) {
            const countY = freqMap.get(y)!;

            if (x === y) {
                // Case 1: x + x = target (e.g., 5 + 5 = 10)
                // We need to choose 2 elements from countX occurrences.
                // The number of pairs is countX * (countX - 1) / 2.
                // Since the problem asks for pairs of positions (i != j), this is the combination formula.
                pairCount += countX * (countX - 1) / 2;
            } else if (x < y) {
                // Case 2: x + y = target, where x != y
                // To avoid double counting (e.g., counting (x, y) and then (y, x)),
                // we only process pairs where x is strictly less than y.
                // The number of pairs is countX * countY.
                pairCount += countX * countY;
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
