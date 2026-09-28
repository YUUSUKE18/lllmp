import { Readable } from 'stream';

const input = process.stdin.readable();
const { readLine } = input;

let lines: string[] = [];
let currentLine = '';

while (readLine(input) !== undefined) {
    currentLine += readLine();
    if (currentLine.trim() !== '') {
        lines.push(currentLine);
        currentLine = '';
    }
}

const target = parseInt(lines[0], 10);
const nums = lines
    .filter(line => {
        const numStr = line.trim();
        if (!numStr) return false;
        const num = parseInt(numStr, 10);
        return !isNaN(num);
    })
    .map(line => {
        const numStr = line.trim();
        if (!numStr) return null;
        const num = parseInt(numStr, 10);
        return num;
    });

const pairs = [];
const numIndices = nums.length;

for (let i = 0; i < numIndices; i++) {
    if (nums[i] === null) continue;
    for (let j = i + 1; j < numIndices; j++) {
        if (nums[j] === null) continue;
        if (nums[i] + nums[j] === target) {
            pairs.push(i + 1, j + 1); // 1-based indices
        }
    }
}

const result = `pairs=${pairs.length}`;
console.log(result);
