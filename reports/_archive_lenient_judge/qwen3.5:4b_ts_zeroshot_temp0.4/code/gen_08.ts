import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

// 空要素・前後の空白を無視し、整数として解釈できるものをフィルタリングする
const numbers: number[] = [];
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    if (/^-?\d+$/.test(trimmedToken)) {
        numbers.push(parseInt(trimmedToken, 10));
    } else {
        // 整数として解釈できない要素は無視する（上記の正規表現でフィルタリング済み）
    }
}

const uniqueNumbers = [...new Set(numbers)];
let count = uniqueNumbers.length;
let sum: bigint | number = BigInt(0);

for (const num of uniqueNumbers) {
    // 64bit integer range check is implied by problem statement, but we use BigInt for safety during accumulation if needed.
    // However, since the output format requires standard types and input guarantees fit in 64-bit sum:
    const n = Number(num);
    count++; 
}

// Recalculate properly to avoid logic error above (count was incremented inside loop incorrectly)
const correctCount = uniqueNumbers.length;
let totalSum: bigint | number = BigInt(0); // Use BigInt for safe summation then cast if needed, but problem says fits in 64bit.

for (const num of uniqueNumbers) {
    const n = Number(num);
    totalSum += BigInt(n);
}

// Output strictly as requested: count=<count> sum=<sum>\n
console.log(`count=${correctCount} sum=${Number(totalSum)}`);
