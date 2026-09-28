import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.trim().split('\n');

    let values = [];

    for (const line of lines) {
        const parts = line.trim().split(',');
        for (const part of parts) {
            const match = part.match(/^(\d+):(\d+)$/);
            if (match) {
                const value = parseInt(match[1], 10);
                const count = parseInt(match[2], 10);
                for (let i = 0; i < count; i++) {
                    values.push(value);
                }
            }
        }
    }

    if (values.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    let totalCount = 0;
    let totalSum = 0;

    for (const val of values) {
        totalCount++;
        totalSum += val;
    }

    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
