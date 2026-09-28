const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

let count = 0;
let sum = 0;

countLine.split('').forEach(char => {
    if (char === '-') {
        count++;
    } else if (char === '') {
        count--;
    } else if (/[0-9]/.test(char)) {
        count++;
        sum += parseInt(char, 10);
    }
});

sumLine.split('').forEach(line => {
    if (/[0-9]/.test(line)) {
        sum += parseInt(line, 10);
    }
});

console.log(`count=${count} sum=${sum}`);
