import { readFileSync, readLine } from 'fs';

interface Memo {
    [key: string]: number;
}

const memo: Memo = {};

async function processQueries() {
    const queries = readFileSync('input.txt', 'utf-8').split('\n');

    let total = 0;

    for (const query of queries) {
        if (query.trim() === '') continue;

        const num = parseInt(query);
        if (isNaN(num) || num < 1) continue;

        total += calculateSteps(num);
    }

    console.log(`total=${total}`);
}

function calculateSteps(n: number): number {
    if (memo[n] !== undefined) return memo[n];

    let steps = 0;

    while (n !== 1) {
        memo[n] = steps;
        steps++;

        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    }

    memo[1] = steps;
    return steps;
}

processQueries();
