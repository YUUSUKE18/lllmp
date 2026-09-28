const input = process.stdin;
input.setEncoding('utf8');
const text = input.read();

if (!text) {
    console.log('valid=0');
    return;
}

const lines = text.split('\n');
let count = 0;

for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;

    // Check if contains only digits and commas
    if (!/^[0-9,]+$/.test(trimmed)) continue;

    // Check if contains at least one number sequence (at least one digit)
    if (/[0-9]/.test(trimmed)) {
        count++;
    }
}

console.log(`valid=${count}`);
