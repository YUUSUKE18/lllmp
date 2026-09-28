const countStr = process.stdin.readline() || '';
const sumStr = process.stdin.slice(1, -1).join('\n');

const count = parseInt(countStr, 10);
const sum = 0;

const lines = process.stdin.read().split('\n');
for (let line of lines) {
    const numStr = line.trim();
    if (/^-?\d+$/.test(numStr)) {
        const num = parseInt(numStr, 10);
        sum += num;
        if (count > 0) {
            count--;
        }
    }
}

console.log(`count=${count} sum=${sum}`);
