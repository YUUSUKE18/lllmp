const input = process.stdin.read();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
    const [value, num] = part.trim().split(':');
    if (!value || !num) continue;
    const valueNum = parseInt(value, 10);
    const numNum = parseInt(num, 10);
    if (isNaN(valueNum) || isNaN(numNum)) continue;
    if (numNum < 0) continue;
    count += numNum;
    sum += valueNum * numNum;
}

console.log(`count=${count} sum=${sum}`);
