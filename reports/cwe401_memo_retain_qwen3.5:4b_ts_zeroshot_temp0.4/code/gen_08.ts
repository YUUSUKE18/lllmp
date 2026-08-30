import { Readline } from "readline";

const rl = new Readline(process.stdin);

let total = 0;
const memo: Map<number, number> = new Map();

function calculateSteps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

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

rl.on("line", (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    const n = parseInt(trimmed);
    if (isNaN(n)) return;

    total += calculateSteps(n);
});

rl.on("close", () => {
    console.log(`total=${total}`);
});
