let count = 0;
let sum = 0;
const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

if (input.length === 0) {
    console.log(`count=0 sum=0`);
    process.exit(0);
}

// 1行目を読み取る
const firstLine = input[0].trim();
if (firstLine === "") {
    console.log(`count=0 sum=0`);
    process.exit(0);
}

const numCount = parseInt(firstLine, 10);
if (isNaN(numCount)) {
    console.log(`count=0 sum=0`);
    process.exit(0);
}

// 2行目以降を読み取る
for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === "") continue;

    const num = parseInt(line, 10);
    if (!isNaN(num)) {
        count++;
        sum += num;
    }
}

// 結果を出力
console.log(`count=${count} sum=${sum}`);
