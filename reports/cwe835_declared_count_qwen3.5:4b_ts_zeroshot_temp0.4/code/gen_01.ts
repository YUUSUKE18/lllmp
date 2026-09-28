const input = process.stdin.read();
let lines = input.split('\n');
if (lines.length === 0) {
    console.log('count=0 sum=0\n');
    process.exit(0);
}

const firstLine = parseInt(lines[0], 10);
const numbers: number[] = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        numbers.push(num);
    }
}

const count = numbers.length;
const sum = numbers.reduce((a, b) => a + b, 0);

console.log(`count=${count} sum=${sum}\n`);
