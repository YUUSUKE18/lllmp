const readline = require('readline');
const fs = require('fs');

const memo = new Map();

function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n);
    let count = 0;
    let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    while (next !== 1) {
        count++;
        let temp = next;
        next = next % 2 === 0 ? next / 2 : 3 * next + 1;
    }
    memo.set(n, count);
    return count;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', line => {
    const num = parseInt(line, 10);
    if (!isNaN(num) && num >= 1) {
        const stepsCount = steps(num);
        const total = 0;
        for (let i = 1; i <= num; i++) {
            const steps = steps(i);
            total += steps;
        }
        console.log(`total=${total}`);
    }
});

rl.close();
