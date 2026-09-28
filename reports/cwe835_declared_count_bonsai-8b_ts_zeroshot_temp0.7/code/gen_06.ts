const lines = process.stdin.read().split('\n');
let count = 0;
let sum = 0;

for (let line of lines) {
    if (line.trim() === '') continue;
    const numStr = line.trim();
    if (/^-?\d+$/.test(numStr)) {
        const num = parseInt(numStr, 10);
        count++;
        sum += num;
    }
}

console.log(`count=${count} sum=${sum}`);
