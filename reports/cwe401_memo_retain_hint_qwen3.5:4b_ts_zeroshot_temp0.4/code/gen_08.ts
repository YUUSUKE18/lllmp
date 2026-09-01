const memo = new Map<number, number>();

function stepCount(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
    let nextN: number;
    if (n % 2 === 0) {
        nextN = n / 2;
    } else {
        nextN = 3 * n + 1;
    }
    
    const count = 1 + stepCount(nextN);
    memo.set(n, count);
    return count;
}

function parseInput(input: string): number[] {
    const lines = input.split('\n');
    const numbers: number[] = [];
    for (const line of lines) {
        if (line.trim() === '') continue;
        const num = parseInt(line.trim(), 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

function main() {
    const input = process.stdin.read().toString();
    const queries = parseInput(input);
    
    let total = 0;
    for (const n of queries) {
        total += stepCount(n);
    }
    
    console.log(`total=${total}`);
}

main();
