const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

let count = 0;
let sum = 0;

countLine.split('').forEach(char => {
    if (/^[0-9]+$/.test(char)) {
        count++;
    }
});

sumLine.split('').forEach(line => {
    const num = parseInt(line, 10);
    if (/^[0-9]+$/.test(num.toString()) && num !== 0 && num !== NaN && num !== Infinity && num !== -Infinity {
        sum += num;
    }
});

console.log(`count=${count} sum=${sum}`);
