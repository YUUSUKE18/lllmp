const memo = new Map<number, number>();

function steps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let result = 0;
    let current = n;
    
    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            // Safety check for potential overflow before assignment, though problem statement guarantees 64-bit fit.
            // In JS, numbers are doubles, so we rely on the input guarantee.
            current = (3 * current) + 1;
        }
        result++;
    }
    
    memo.set(n, result);
    return result;
}

const lines = process.stdin.read().split('\n');
let totalSteps = 0;

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    let n: number | undefined;
    try {
        n = parseInt(trimmed, 10);
        if (isNaN(n)) continue;
    } catch (e) {
        continue;
    }
    
    if (n < 1) continue;
    
    const s = steps(n);
    totalSteps += s;
}

console.log(`total=${totalSteps}`);
