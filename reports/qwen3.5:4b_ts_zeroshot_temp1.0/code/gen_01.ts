const input = process.stdin.read().trim();
if (!input) return;

const parts = input.split(',').map(s => {
    const n = parseInt(s.trim(), 10);
    return !isNaN(n) ? n : undefined;
}).filter((n): n is number => !!n);

const counts: Record<number, number> = {};
let totalSum = 0n;

for (const num of parts) {
    if (typeof num === 'number') {
        const key = String(num);
        counts[key] = (counts[key] || 0) + 1;
        totalSum += BigInt(num);
    }
}

let countStr = '';
let sumStr = totalSum.toString();
for (const key in counts) {
    if (countStr.length > 0) countStr += ' ';
    countStr += `${counts[key]} ${key}`;
}

console.log(`count=${countStr.trim()} sum=${sumStr}`);
