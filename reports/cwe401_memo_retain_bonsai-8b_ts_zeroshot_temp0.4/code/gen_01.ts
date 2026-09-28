const stdin = process.stdin;
const memo = new Map<number, number>();

function collateInput(): number[] {
    const result = [];
    let line;
    while ((line = stdin.readLine()) !== null) {
        const numStr = line.trim();
        if (/^-?\d+$/.test(numStr)) {
            result.push(parseInt(numStr));
        }
    }
    return result;
}

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n);

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

const numbers = collateInput();
let total = 0;

for (const num of numbers) {
    total += steps(num);
}

console.log(`total=${total}`);
