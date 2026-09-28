import type { ReadStream } from 'stream'; // Not used, just checking Node.js structure

// Read all input from stdin
const input = process.stdin.read();
if (!input) {
    console.log('pairs=0');
    return;
}

// Split lines
const lines = input.split('\n');

// Helper to check if a line is a valid integer
function isIntegerLine(line: string): boolean {
    const trimmed = line.trim();
    if (!trimmed) return false;
    // Regex for integers (optional negative sign, followed by digits)
    return /^-?\d+$/.test(trimmed);
}

// Collect all integers from the input
const tokens: string[] = [];
for (const line of lines) {
    if (isIntegerLine(line)) {
        tokens.push(line.trim());
    }
}

if (tokens.length === 0) {
    console.log('pairs=0');
    return;
}

// First valid integer is the target value
const target = BigInt(tokens[0]);

// Remaining integers are candidates
let count = 0n;
const seen = new Set<BigInt>();

for (let i = 1; i < tokens.length; i++) {
    const val = BigInt(tokens[i]);
    const complement = target - val;
    
    if (seen.has(complement)) {
        count++;
    }
    seen.add(val);
}

console.log(`pairs=${count}`);
