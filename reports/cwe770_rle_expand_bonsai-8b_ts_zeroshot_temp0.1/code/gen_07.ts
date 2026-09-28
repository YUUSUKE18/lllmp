const input = process.stdin.read();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
    const [value, num] = part.trim().split(':');
    if (!value || !num) continue;

    const num = parseInt(num, 10);
    if (isNaN(num) || num < 0) continue;

    count += num;
    sum += num * num;
}

console.log(`count=${count} sum=${sum}`);
