const lines = process.stdin.read().split('\n');
let count = 0;

for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.length === 0) {
        continue;
    }

    // Check if contains only digits and commas
    const isValidChars = /^[0-9,]+$/.test(trimmed);
    
    // Check if contains at least one digit
    const hasDigit = /[0-9]/.test(trimmed);

    if (isValidChars && hasDigit) {
        count++;
    }
}

console.log(`valid=${count}`);
