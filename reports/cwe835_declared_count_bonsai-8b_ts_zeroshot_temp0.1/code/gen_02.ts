const lines = process.stdin.read().split('\n');
let count = 0;
let sum = 0;

for (const line of lines) {
    if (line.trim() === '') continue;
    const numStr = line.trim();
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
        count++;
        sum += num;
    }
}

console.log(`count=${count} sum=${sum}`);
