import { Map } from 'typescript';

const memo = new Map<string, number>();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n.toString())) return memo.get(n.toString())!;
    
    let count = 0;
    let current = n;
    
    while (current !== 1) {
        count++;
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
    }
    
    memo.set(n.toString(), count);
    return count;
}

const total = 0;
for (let line of process.stdin) {
    const numStr = line.trim();
    if (!numStr || isNaN(parseInt(numStr))) continue;
    const num = parseInt(numStr);
    total += steps(num);
}

console.log(`total=${total}`);
