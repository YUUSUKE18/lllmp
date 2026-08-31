const input = require('fs').readFileSync(0, 'utf8');
const lines = input.trim().split('\n');
if (lines.length === 0) {
    process.exit(0);
}
const countLine = parseInt(lines[0]);
let count = 0;
let sum: number = 0;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    const parts = line.split(/\s+/).map(Number);
    for (const num of parts) {
        if (!isNaN(num)) {
            sum += num;
            count++;
        }
    }
}

console.log(`count=${count} sum=${sum}`);
