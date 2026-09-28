const memo = new Map<number, number>();

function solve(n: number): number {
    if (n === 1) return 0;
    
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let steps = 0;
    let current = n;

    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }

    memo.set(n, steps);
    return steps;
}

function parseInput(): number[] {
    const lines = process.stdin.read().split('\n');
    const numbers: number[] = [];
    
    for (const line of lines) {
        if (line.trim() === '') continue;
        
        try {
            const num = parseInt(line.trim(), 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        } catch (e) {
            // 解析エラーは無視
        }
    }
    
    return numbers;
}

const queries = parseInput();
let totalSteps = 0;

for (const n of queries) {
    totalSteps += solve(n);
}

console.log(`total=${totalSteps}`);
