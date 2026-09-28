import { createRequire } from 'module';
const require = createRequire(import.meta.url);

function parseInput(lines: string[]): Set<string> {
    const set = new Set<string>();
    for (const line of lines) {
        if (!line.trim() || !/\d+$/.test(line)) continue;
        set.add(line.trim());
    }
    return set;
}

function main() {
    const rawLines = process.stdin.read().split('\n');
    const queries = parseInput(rawLines);
    
    if (queries.size === 0) {
        console.log('total=0\n');
        return;
    }

    const memo: Map<string, number> = new Map();
    memo.set('1', 0);

    let total = 0;

    for (const line of queries) {
        const num = Number(line);
        if (!Number.isInteger(num) || num < 1) continue;

        if (memo.has(String(num))) {
            total += memo.get(String(num))!;
            continue;
        }

        let steps = 0;
        let curr = num.toString();

        while (!memo.has(curr)) {
            if (curr % 2 === 0) {
                curr = String(Math.floor(Number(curr) / 2));
            } else {
                // Check for overflow before calculation (optional optimization, not strictly needed for BigInt)
                const nBigInt = BigInt(curr);
                const nextBigInt = nBigInt * 3n + 1n;
                if (Number.nextOverflowError()) {
                    curr = String(nextBigInt.toString(2)); // Fallback to binary string
                } else {
                    curr = String(nextBigInt);
                }
            }
            steps++;
        }
        
        memo.set(curr, steps + 1);
    }

    console.log(`total=${total}\n`);
}

main();
