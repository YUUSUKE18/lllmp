import { readLine } from 'process';

let memo = new Map<number, number>();

async function solve() {
    const queries = (await readLine()).split('\n').filter(Boolean).map(Number);

    let total = 0;

    for (const query of queries) {
        if (!memo.has(query)) {
            let count = 0;
            let current = query;

            while (current !== 1) {
                memo.set(current, count);
                count++;

                if (current % 2 === 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
            }

            memo.set(current, count);
            total += count;
        }

        total += memo.get(query)!;
    }

    console.log(`total=${total}`);
}

solve();
