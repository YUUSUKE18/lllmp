import { strict as assert } from 'assert';

function countPairs(target: number, numbers: number[]): number {
    let pairCount = 0;
    const numbersSet = new Set<number>();

    for (const num of numbers) {
        if (numbersSet.has(target - num)) {
            pairCount++;
        }
        numbersSet.add(num);
    }

    return pairCount;
}

function solve() {
    const target = parseInt(process.stdin.readLine() as string, 10);
    const numbers = process.stdin.readLines().slice(1).map(line => parseInt(line, 10));

    const pairCount = countPairs(target, numbers);
    console.log(`pairs=${pairCount}`);
}

solve();
