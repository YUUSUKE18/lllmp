const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

let count = 0;
let sum = 0;

countLine.split('').forEach(char => {
    if (char === '-' || (char >= '0' && char <= '9')) {
        count++;
    }
});

sumLine.split('').forEach(line => {
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        sum += num;
    }
});

console.log(`count=${count} sum=${sum}`);
