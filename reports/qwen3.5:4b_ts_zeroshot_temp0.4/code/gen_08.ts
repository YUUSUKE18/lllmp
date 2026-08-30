const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=0\n');
    return;
}

const values = input.split(',').map(s => {
    const trimmed = s.trim();
    if (trimmed === '') return null;
    const num = parseInt(trimmed, 10);
    if (!Number.isFinite(num) || isNaN(num)) return null;
    return num;
}).filter(n => n !== null);

const uniqueValues = Array.from(new Set(values));
const count = uniqueValues.length;
const sum = uniqueValues.reduce((acc, val) => acc + val, 0);

console.log(`count=${count} sum=${sum}\n`);
