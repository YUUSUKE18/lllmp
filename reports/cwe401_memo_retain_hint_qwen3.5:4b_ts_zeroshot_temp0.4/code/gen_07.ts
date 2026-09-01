const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    
    let count = 0;
    let current = n;
    
    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        count++;
    }
    return count;
}

function solve(n: number): number {
    if (n <= 0) return 0; // 負の整数や 0 は処理しない（仕様は 1 以上の整数）
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }
    
    return steps;
}

function parseLine(line: string): number | null {
    const trimmed = line.trim();
    if (!trimmed) return null;
    const result = parseInt(trimmed, 10);
    if (isNaN(result)) return null;
    return result;
}

function main() {
    const lines = [];
    let input: Buffer | undefined;
    
    // 標準入力をストリーミングで読む
    const reader = process.stdin.createReadStream({ encoding: 'utf8' });
    reader.on('data', (chunk) => {
        lines.push(chunk.toString());
    });
    reader.on('end', () => {
        let totalSteps = 0;
        
        for (const line of lines) {
            const n = parseLine(line);
            if (n !== null && n > 0) {
                // メモ化された結果があるか確認
                if (memo.has(n)) {
                    totalSteps += memo.get(n)!;
                } else {
                    const steps = solve(n);
                    memo.set(n, steps);
                    totalSteps += steps;
                }
            }
        }
        
        console.log(`total=${totalSteps}`);
    });
    
    reader.on('error', (err) => {
        // エラー発生時は処理を停止するが、出力は行わない（仕様上はエラーハンドリングの詳細指定なし）
        // 通常環境では入力終了後に end イベントが発生するため
    });
}

main();
