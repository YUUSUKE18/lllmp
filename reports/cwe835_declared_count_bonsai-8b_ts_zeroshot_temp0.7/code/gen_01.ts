const countStr = process.stdin.readline().trim();
const sumStr = process.stdin.slice(1, -1).join(' ').trim();

let count = 0;
let sum = 0;

if (countStr) {
    const countNum = parseInt(countStr, 10);
    if (!isNaN(countNum)) {
        count = countNum;
    }
}

if (sumStr) {
    const sumNum = parseInt(sumStr, 10);
    if (!isNaN(sumNum)) {
        sum = sumNum;
    }
}

console.log(`count=${count} sum=${sum}`);
