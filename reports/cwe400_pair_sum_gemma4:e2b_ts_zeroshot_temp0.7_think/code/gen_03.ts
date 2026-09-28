import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        // Handle empty input case
        console.log('pairs=0');
        return;
    }

    // Line 1 is the target value
    const targetLine = input[0].trim();
    if (!targetLine) {
        // If the first line is empty, we cannot proceed
        console.log('pairs=0');
        return;
    }
    const T = parseInt(targetLine, 10);

    // Parse the subsequent lines as numbers
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line.length > 0) {
            const num = parseInt(line, 10);
            // Check if the line contains a valid integer
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // Step 1: Count the frequency of each number
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // Step 2: Iterate through the unique numbers and find pairs
    // We iterate over the keys (unique numbers) in the map to avoid double counting.
    for (const [x, countX] of counts.entries()) {
        const y = T - x;

        if (counts.has(y)) {
            const countY = counts.get(y)!;

            if (x < y) {
                // Case 1: x and y are distinct. We count all combinations.
                // Since we iterate over unique keys, we only calculate the pair (x, y) once.
                pairCount += countX * countY;
            } else if (x === y) {
                // Case 2: x and y are the same (x + x = T). We need combinations of x.
                // Since the indices must be different, we use the combination formula nC2 = n * (n - 1) / 2.
                if (countX >= 2) {
                    pairCount += countX * (countX - 1) / 2;
                }
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
