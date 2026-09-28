const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1).join('\n');

let count = 0;
let sum = 0;

for (let line of sumLine.split('\n')) {
    const numStr = line.trim();
    if (!numStr || isNaN(Number(numStr))) {
        continue;
    }
    const num = Number(numStr);
    sum += num;
    count++;
}

console.log(`count=${count} sum=${sum}`);
