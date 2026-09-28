const input = process.stdin.read().split('\n');

function parseBigInt(str: string): bigint | null {
    const trimmed = str.trim();
    if (!trimmed) return null;
    try {
        return BigInt(trimmed);
    } catch (e) {
        return null;
    }
}

const lines = input.filter(line => line.trim() !== '');
let targetVal: bigint | null = null;
const dataValues: bigint[] = [];

for (const line of lines) {
    const val = parseBigInt(line);
    if (val !== null) {
        if (targetVal === null) {
            targetVal = val;
        } else {
            dataValues.push(val);
        }
    }
}

if (targetVal === null) {
    console.log('pairs=0');
} else {
    let count = 0n;
    const seen = new Map<bigint, bigint>();

    for (const val of dataValues) {
        const needed = targetVal - val;
        if (seen.has(needed)) {
            count += seen.get(needed)!;
        }
        const currentCount = seen.get(val) ?? 0n;
        seen.set(val, currentCount + 1n);
    }

    console.log(`pairs=${count}`);
}
