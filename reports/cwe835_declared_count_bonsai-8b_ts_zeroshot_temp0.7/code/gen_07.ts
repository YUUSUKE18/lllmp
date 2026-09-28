const lines = process.stdin.read().split('\n');
let count = 0;
let sum = 0;

for (const line of lines) {
    const match = line.match(/\d+/);
    if (match) {
        const num = parseInt(match[0], 10);
        count++;
        sum += num;
    }
}

console.log(`count=${count} sum=${sum}`);
