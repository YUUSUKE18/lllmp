const input = process.stdin.read();
const elements = input.split(/[\s,,]+/).map(Number);
const uniqueElements = new Set(elements.filter(n => !isNaN(n)));
let count = 0, sum = 0n;
for (const e of uniqueElements) {
    if (!Number.isFinite(e)) continue;
    count++;
    sum += BigInt(e);
}
console.log(`count=${count} sum=${sum}`);
