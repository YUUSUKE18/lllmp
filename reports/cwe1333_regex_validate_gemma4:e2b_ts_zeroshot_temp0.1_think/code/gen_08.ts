import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 1. Trim leading/trailing whitespace
        const trimmedLine = line.trim();

        // 2. Check for emptiness
        if (trimmedLine.length === 0) {
            continue; // Empty lines are invalid
        }

        // 3. Check content validity: Must only contain digits, commas, and spaces.
        // We use a regex to ensure the line only contains allowed characters.
        // Allowed characters: digits (0-9), comma (,), space ( ).
        if (!/^[0-9, ]*$/.test(line)) {
            continue; // Contains invalid characters
        }

        // 4. Check structural validity: Must contain at least one comma, or be a sequence of numbers.
        // The requirement is: "1 個以上の数字列がカンマで区切られて並んでいること"
        
        // If the line contains no commas, it is not a comma-separated list (unless it's a single number, but the rule implies separation).
        // If the line is just "123", it is a single number sequence, not a comma-separated list.
        // If the line is "1,2", it is valid.
        // If the line is "123", it is invalid based on the structure requirement.
        
        // We check if the line contains at least one comma.
        if (trimmedLine.includes(',')) {
            // Further check: Ensure that the segments between commas are composed of digits (ignoring spaces).
            const segments = trimmedLine.split(',');
            let allSegmentsAreNumbers = true;

            for (const segment of segments) {
                // Trim the segment to check if it contains only digits
                const trimmedSegment = segment.trim();
                
                // If the segment is empty (e.g., "1,,2"), it's structurally fine, but we must ensure the overall structure implies number sequences.
                // If the segment is non-empty, it must be composed entirely of digits.
                if (trimmedSegment.length > 0) {
                    if (!/^\d+$/.test(trimmedSegment)) {
                        allSegmentsAreNumbers = false;
                        break;
                    }
                }
            }

            if (allSegmentsAreNumbers) {
                validCount++;
            }
        }
    }

    // Output the result
    process.stdout.write(`valid=${validCount}\n`);
}

solve();
