const readline = require('readline');
const fs = require('fs');

const memo = new Map();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

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

    memo.set(n, count);
    return count;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', line => {
    const n = parseInt(line.trim());
    if (!isNaN(n) && n > 0) {
        const stepsCount = steps(n);
        const total = (n === 1) ? 0 : stepsCount + total(n - 1);
        console.log(`total=${total}`);
    }
});

rl.on('close', () => {
    console.log(`total=${total}`);
});
