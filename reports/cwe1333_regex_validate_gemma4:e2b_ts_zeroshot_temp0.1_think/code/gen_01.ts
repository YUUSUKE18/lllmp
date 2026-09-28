import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 1. Trim whitespace
        const trimmedLine = line.trim();

        // 2. Check for emptiness
        if (trimmedLine.length === 0) {
            continue; // Empty lines are invalid
        }

        // 3. Validate structure: Must consist of comma-separated integer sequences.
        // Split the line by comma.
        const parts = trimmedLine.split(',');

        let isValid = true;

        // Check every segment resulting from the split.
        for (const part of parts) {
            // If the segment is non-empty, it must consist entirely of digits.
            if (part.length > 0) {
                // Check if the part contains only digits (and nothing else).
                if (!/^\d+$/.test(part)) {
                    isValid = false;
                    break;
                }
            }
            // Note: Empty parts (resulting from consecutive commas or trailing commas) are allowed.
        }

        if (isValid) {
            validCount++;
        }
    }

    // Output the result in the required format
    process.stdout.write(`valid=${validCount}\n`);
}

solve();
