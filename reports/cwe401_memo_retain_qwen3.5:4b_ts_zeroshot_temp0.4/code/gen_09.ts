const memo = new Map<number, number>();

function collatzStep(n: number): number {
    if (n === 1) return 0;
    let steps = 0;
    while (true) {
        if (memo.has(n)) {
            steps += memo.get(n)!;
            break;
        }
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    }
    return steps;
}

function processQuery(n: number): number {
    let current = n;
    let totalSteps = 0;
    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        totalSteps++;
    }
    return totalSteps;
}

function main() {
    const lines = process.stdin.read().split('\n');
    let totalSum = 0;

    for (const line of lines) {
        if (!line.trim()) continue;
        const n = parseInt(line.trim(), 10);
        if (isNaN(n)) continue;
        
        // 高速化のため、メモ化を適用する
        // 単純なループではなく、memo を使って計算する
        let current = n;
        let steps = 0;
        
        // 既に計算済みの値があるかチェック
        while (current !== 1) {
            if (memo.has(current)) {
                steps += memo.get(current)!;
                break;
            }
            
            // 次の値を計算
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        // メモリ化
        let temp = n;
        let count = 0;
        while (temp !== 1) {
            if (memo.has(temp)) {
                count += memo.get(temp)!;
                break;
            }
            
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }
        
        // 上記の計算で得た count を n のステップ数として使用
        // ただし、n が 1 の場合、steps は 0
        if (n === 1) {
            totalSum += 0;
        } else {
            // メモリ化を行う
            let temp = n;
            while (temp !== 1) {
                if (memo.has(temp)) {
                    break;
                }
                memo.set(temp, count);
                
                if (temp % 2 === 0) {
                    temp = temp / 2;
                } else {
                    temp = 3 * temp + 1;
                }
            }
            
            // n のステップ数を再計算して総和に加算
            let current = n;
            while (current !== 1) {
                if (memo.has(current)) {
                    steps += memo.get(current)!;
                    break;
                }
                
                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }
            
            totalSum += steps;
        }
    }

    console.log(`total=${totalSum}`);
}

main();
