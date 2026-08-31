const input = process.stdin.read().split(/\r?\n/);

const numbers: bigint[] = [];

for (const line of input) {
    if (line.trim() === '') continue;
    const parts = line.split(/\s+/).map(Number);
    for (const part of parts) {
        if (!isNaN(part)) {
            numbers.push(BigInt(part));
        }
    }
}

const count = numbers.length;
let sum = 0n;
for (const n of numbers) {
    sum += n;
}

console.log(`count=${count} sum=${sum}`);
