const memo = new Map<bigint, bigint>();
let totalSum: bigint = 0n;

function getSteps(n: bigint): bigint {
    if (n === 1n) return 0n;
    if (memo.has(n)) return memo.get(n)!;

    const next = n % 2n === 0n ? n / 2n : 3n + 1n;
    const s = getSteps(next);
    
    memo.set(n, s + 1n);
    return s + 1n;
}

const input = process.stdin.read();
if (input === null) {
    console.log('total=0');
    return;
}

const lines = input.toString().trim().split('\n');

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    try {
        const n = BigInt(trimmed);
        if (n < 1n) continue; 
        
        totalSum += getSteps(n);
    } catch (e: any) {
        continue;
    }
}

console.log(`total=${totalSum}`);
