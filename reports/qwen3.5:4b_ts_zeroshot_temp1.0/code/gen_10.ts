const input = process.stdin.read().replace(/\s+/g, '').split(',');

const counts = new Map<number, number>();
let sum = 0;

for (const s of input) {
    if (!s || !/^-?\d+$/.test(s)) continue;
    const num = Number.parseInt(s, 10);
    if (counts.has(num)) {
        counts.set(num, counts.get(num) + 1);
    } else {
        counts.set(num, 1);
        sum += num;
    }
}

const uniqueNumbers = Array.from(counts.keys());
const count = uniqueNumbers.length;

console.log(`count=${count} sum=${sum}`);
