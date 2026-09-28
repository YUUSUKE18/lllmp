import * as fs from 'fs';

const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    const steps = n % 2 === 0 ? 1 : 1;
    let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    
    // メモ化
    if (memo.has(next)) {
        return steps + memo.get(next)!;
    }
    
    memo.set(next, collatzStep(next));
    return steps + memo.get(next)!;
}

function processInput() {
    const lines = fs.readFileSync(0, 'utf8').trim().split('\n');
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        
        // 整数として解析できるか確認
        const num = parseInt(line.trim(), 10);
        if (isNaN(num)) continue;
        
        // 正の整数のみ処理（仕様「1 以上の整数」）
        if (num < 1) continue;
        
        totalSteps += collatzStep(num);
    }
    
    console.log(`total=${totalSteps}`);
}

processInput();
