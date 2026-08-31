const lines = process.stdin.read().split(/\r?\n/).filter(line => line.trim().length > 0);
if (lines.length === 0) process.exit(0);

const countInput = parseInt(lines[0].trim(), 10);
const values: number[] = [];
for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i].trim(), 10);
    if (!isNaN(num)) {
        values.push(num);
    }
}

const count = values.length;
const sum = values.reduce((a, b) => a + b, 0);
console.log(`count=${count} sum=${sum}`);
