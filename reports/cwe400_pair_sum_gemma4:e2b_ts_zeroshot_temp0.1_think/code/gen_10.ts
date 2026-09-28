import * as fs from 'fs';

function solve() {
    // Read all input from standard input
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // Line 1 is the target value
    const targetStr = input[0].trim();
    if (!targetStr) {
        // If the first line is empty, we cannot proceed
        console.log('pairs=0');
        return;
    }
    const target = parseInt(targetStr, 10);

    // Use a Map to store the frequency of each number
    const frequencies = new Map<number, number>();

    // Process subsequent lines (potential numbers)
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') continue;

        const num = parseInt(line, 10);
        
        // Check if it's a valid integer
        if (!isNaN(num)) {
            // Store frequency
            frequencies.set(num, (frequencies.get(num) || 0) + 1);
        }
    }

    let pairCount = 0;

    // Iterate through the unique numbers found in the input
    for (const [numA, countA] of frequencies.entries()) {
        const numB = target - numA;

        // Case 1: A == B (Pairing a number with itself)
        if (numA === numB) {
            // We need to choose 2 distinct indices from countA occurrences.
            // Formula: countA * (countA - 1) / 2
            if (countA >= 2) {
                pairCount += countA * (countA - 1) / 2;
            }
        } 
        // Case 2: A != B (Pairing A with a distinct number B)
        else if (numA < numB) {
            // To avoid double counting (A, B) and (B, A), we only process when A < B.
            if (frequencies.has(numB)) {
                const countB = frequencies.get(numB)!;
                // Number of pairs is the product of their frequencies
                pairCount += countA * countB;
            }
        }
    }

    // Output the result
    console.log(`pairs=${pairCount}`);
}

solve();
