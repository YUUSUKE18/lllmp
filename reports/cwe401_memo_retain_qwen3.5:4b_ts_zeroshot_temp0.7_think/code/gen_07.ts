const memo = new Map<bigint, bigint>();

function getSteps(n: bigint): bigint {
    if (n === 1n) return 0n;
    if (memo.has(n)) return memo.get(n)!;
    
    const isEven = n % 2n === 0n;
    const next = isEven ? n / 2n : (3n + 1n);
    
    const steps = 1n + getSteps(next);
    memo.set(n, steps);
    return steps;
}

const inputBuffer = process.stdin.read();
if (!inputBuffer) return;

let content = inputBuffer.toString('utf8').trim();
const lines = content.split('\n');

let totalSum = 0n;

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    try {
        const n = BigInt(trimmed);
        
        totalSum += getSteps(n);
    } catch (e) {
        // Ignore invalid lines
    }
}

process.stdout.write(`total=${totalSum}\n`);
