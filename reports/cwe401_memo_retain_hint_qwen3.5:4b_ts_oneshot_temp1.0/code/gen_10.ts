import * as fs from "fs";

const memo = new Map<number, number>();

function calculateSteps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let current = n;
    let steps = 0;
    
    while (current !== 1) {
        const isEven = current % 2 === 0;
        if (isEven) {
            current = Math.floor(current / 2);
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }
    
    memo.set(n, steps);
    return steps;
}

function parseInput() {
    const input = fs.readFileSync(0, "utf8");
    const lines = input.split(/\r?\n/);
    let totalSteps = 0;
    
    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const n = parseInt(line.trim(), 10);
            if (!Number.isNaN(n)) {
                totalSteps += calculateSteps(n);
            }
        } catch (e) {
            // 整数として解釈できない場合は無視
        }
    }
    
    console.log(`total=${totalSteps}`);
}

parseInput();
