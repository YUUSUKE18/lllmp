import { readFileSync, readLine } from 'fs';

const memo: { [key: number]: number } = {};

const main = async () => {
    const input = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

    const total = input.reduce((acc, query) => {
        const n = parseInt(query, 10);
        if (n === 1) {
            return acc;
        }

        if (memo[n]) {
            return acc + memo[n];
        }

        const result = n % 2 === 0 ? n / 2 : 3 * n + 1;
        memo[n] = result;
        return acc + result;
    }, 0);

    console.log(`total=${total}`);
};

main();
