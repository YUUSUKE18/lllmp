const memo = new Map<bigint, number>();
memo.set(1n, 0);

function getSteps(n: bigint): number {
    if (memo.has(n)) return memo.get(n)!;

    const path: bigint[] = [n];
    let current = n;

    while (!memo.has(current)) {
        if (current === 1n) break; 

        let next: bigint;
        if ((current & 1n) === 0n) {
            next = current / 2n;
        } else {
            next = (3n * current + 1n);
        }

        path.push(next);
        current = next;
    }

    let stepsToEnd = memo.get(current)!;

    for (let i = path.length - 2; i >= 0; i--) {
        const node = path[i];
        // distance from 'node' to 'path[i+1]' is 1 step
        // so dist(node) = dist(path[i+1]) + 1
        // path[last] is current, with dist = stepsToEnd
        // path[len-2] -> len-1 (current). dist = stepsToEnd + 1.
        const nodeSteps = stepsToEnd + (path.length - 1 - i);
        memo.set(node, nodeSteps);
    }

    return memo.get(n)!;
}

const input = process.stdin.read();
if (!input) {
    // Handle empty input case implicitly by not printing or just printing nothing
    // But based on spec, we should output total=0 if no queries. 
    // Let's assume at least one line or handle gracefully.
    // If input is empty, totalSum remains 0n.
}

const lines = input.split('\n');
let totalSum = 0n;

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let n: bigint;
    try {
        // Check if it's a valid integer string
        if (/^-?\d+$/.test(trimmed)) {
            n = BigInt(trimmed);
        } else {
            continue;
        }
    } catch {
        continue;
    }

    if (n < 1n) continue;

    totalSum += BigInt(getSteps(n));
}

console.log(`total=${totalSum}`);
