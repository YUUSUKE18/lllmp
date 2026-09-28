import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1. Parse the target value (T) from the first line
    const T_str = input[0].trim();
    if (!T_str) {
        console.log('pairs=0');
        return;
    }
    const T = parseInt(T_str, 10);

    // 2. Parse the sequence of numbers (A) from the remaining lines
    const A: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                A.push(num);
            }
        }
    }

    if (A.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 3. Use a frequency map to count occurrences of each number
    const freq = new Map<number, number>();
    for (const num of A) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 4. Iterate through the unique numbers in the frequency map to find pairs
    // We iterate over the keys to ensure we only check each unique number once.
    for (const [x, countX] of freq.entries()) {
        const y = T - x;

        if (freq.has(y)) {
            const countY = freq.get(y)!;

            if (x === y) {
                // Case 1: x + x = T (e.g., 5 + 5 = 10)
                // We need to choose 2 distinct indices from countX occurrences.
                // Formula: countX * (countX - 1) / 2
                pairCount += (countX * (countX - 1)) / 2;
            } else if (x < y) {
                // Case 2: x + y = T (where x != y)
                // We only count when x < y to avoid double counting (x, y) and (y, x).
                // We multiply the counts because every instance of x can be paired with every instance of y.
                pairCount += countX * countY;
            }
        }
    }

    // 5. Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
