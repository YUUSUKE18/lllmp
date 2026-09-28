import { Readline } from 'readline';

const rl = new Readline(process.stdin);

let total = 0;
const memo = new Map<number, number>();

function calculateStep(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let steps = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    
    memo.set(n, steps);
    return steps;
}

rl.on('line', (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    const n = parseInt(trimmed);
    if (isNaN(n)) return;
    
    total += calculateStep(n);
});

rl.on('close', () => {
    console.log(`total=${total}`);
});
