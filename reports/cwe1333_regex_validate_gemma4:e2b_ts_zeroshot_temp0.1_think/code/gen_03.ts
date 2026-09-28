import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 1. Trim whitespace
        const trimmedLine = line.trim();

        // 2. Check for empty lines
        if (trimmedLine.length === 0) {
            continue;
        }

        // 3. Check for invalid characters (must only contain digits and commas)
        // Regex check: ensures the line only contains [0-9] and ','
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue;
        }

        // 4. Check for the required structure: 1 or more comma-separated number sequences.
        // We split by comma. If the resulting array contains at least one non-empty string,
        // it means there was at least one sequence of digits separated by commas.
        const parts = trimmedLine.split(',');
        
        let hasValidNumberSequence = false;
        for (const part of parts) {
            // Check if the part is non-empty and consists only of digits
            if (part.length > 0 && /^\d+$/.test(part)) {
                hasValidNumberSequence = true;
                break;
            }
        }

        if (hasValidNumberSequence) {
            validCount++;
        }
    }

    // Output the result in the required format
    process.stdout.write(`valid=${validCount}\n`);
}

solve();
