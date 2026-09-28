const input = process.stdin.read().trim();
const items = input.split(',').filter(item => item.trim() !== '');
let count = 0;
let total = 0;

for (const item of items) {
    const [value, countStr] = item.split(':');
    const value = parseInt(value, 10);
    const count = parseInt(countStr, 10);
    if (isNaN(value) || isNaN(count) || count < 0) continue;
    count += value;
    total += value * count;
}

console.log(`count=${count} sum=${total}`);
