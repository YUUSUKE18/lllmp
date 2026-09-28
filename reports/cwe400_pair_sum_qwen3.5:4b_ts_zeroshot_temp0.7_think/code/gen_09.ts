const input = process.stdin.read().toString('utf-8');
if (!input) process.exit(0);

const lines = input.split('\n');
const tokens: bigint[] = [];
for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^[+-]?\d+$/);
    if (!match) continue;
    const val = BigInt(trimmed);
    tokens.push(val);
}

if (tokens.length < 1) {
    console.log('pairs=0');
} else {
    const target = tokens[0];
    const nums = tokens.slice(1);

    const seen: Map<bigint, bigint> = new Map();
    let ans = 0n;

    for (const num of nums) {
        const complement = target - num;
        if (seen.has(complement)) {
            ans += seen.get(complement)!;
        }
        seen.set(num, (seen.get(num) || 0n) + 1n);
    }

    console.log(`pairs=${ans}`);
}
