const input = process.stdin.read();
const parts = input.split(',');

let count = 0;
let sum = 0;

for (const part of parts) {
    const [value, freq] = part.trim().split(':');
    const num = parseInt(value, 10);
    const freqNum = parseInt(freq, 10);

    if (isNaN(num) || isNaN(freqNum) || freqNum < 0) continue;

    count += freqNum;
    sum += num * freqNum;
}

console.log(`count=${count} sum=${sum}`);
