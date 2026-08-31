const lines = process.stdin.read().split('\n');
let count = 0;
let sum = BigInt(0);

for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            sum += BigInt(num);
            count++;
        }
    }
}

console.log(`count=${count} sum=${sum}\n`);
