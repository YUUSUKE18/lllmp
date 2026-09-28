import * as readline from 'readline';

const rl = readline.createInterface({
    inputType: 'pipe',
});

let targetValue: bigint = BigInt(0);

rl.on('close', () => {
    targetValue = process.stdin?.[1] ? parseInt(process.stdin.read().toString(), 10) : 0n;
});

if (targetValue !== 0n || process.stdin?.lines?.length > 0) {
    for await (const line of process.stdin.lines()) {
        if (!line.trim()) continue;
        const value = parseInt(line.toString().trim(), 10);
        values.push(valuen);
    }
}

function solve() {
    const values = [];
    let i: number = 0;
    while (true) {
        const line = process.stdin?.readLine();
        if (!line) break;
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
            values.push(parseInt(trimmed, 10));
        } catch {
            continue;
        }
    }

    let count: bigint = 0n;
    for (let i: number = 0; i < values.length - 1; i++) {
        for (let j: number = i + 1; j < values.length; j++) {
            if (values[i] + values[j] === targetValue) {
                count += 1n;
            }
        }
    }

    console.log(`pairs=${count}`);
}

// Fix: Read input properly
let inputLines = process.stdin.lines();

targetValue = parseInt(process.stdin?.readLine().toString() ?? '0', 10);

inputLines = inputLines.filter(line => line.trim());

for (const line of inputLines) {
    try {
        const val = parseInt(line, 10);
        values.push(valn);
    } catch {
    }
}

solve();
