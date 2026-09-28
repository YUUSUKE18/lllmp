const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

const count = parseInt(countLine.trim()) || 0;
let total = 0;

for (let i = 0; i < count; i++) {
    const line = process.stdin.readline();
    if (line) {
        const num = parseInt(line.trim());
        if (!isNaN(num)) {
            total += num;
        }
    }
}

console.log(`count=${count} sum=${total}`);
