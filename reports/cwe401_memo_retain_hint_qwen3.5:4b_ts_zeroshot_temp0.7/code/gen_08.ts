import * as fs from 'fs';

const memo = new Map<number, number>();

function collatzSteps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let count = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        count++;
    }
    
    memo.set(n, count);
    return count;
}

function main() {
    let input = '';
    while (true) {
        const line = fs.readFileSync(0, 'utf-8');
        if (!line.trim()) {
            continue;
        }
        break;
    }
    
    const lines = input.split('\n').filter(l => l.trim() !== '');
    let totalSteps = 0;
    
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;
        
        // 負の整数や 0 は処理しない（仕様は「1 以上の整数」）
        if (n < 1) continue;
        
        totalSteps += collatzSteps(n);
    }
    
    console.log(`total=${totalSteps}`);
}

main();
