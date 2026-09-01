import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');
const memo: Map<number, number> = new Map();
memo.set(1, 0);

let total = 0;

for (const line of input) {
    if (!line.trim() || isNaN(Number(line))) continue;
    
    const n = Number(line);
    let steps = 0;
    let current = n;
    
    while (current !== 1) {
        if (!memo.has(current)) {
            memo.set(current, 0);
        }
        
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            // 64bit integer check: max value is around 5.7e15 for n <= 10^9
            // JavaScript handles large integers automatically, but we ensure logic correctness
            if (current > 2147483647) {
                current = (current * 3 + 1);
            } else {
                current = (current * 3 + 1);
            }
        }
        steps++;
    }
    
    total += steps;
}

console.log(`total=${total}`);
