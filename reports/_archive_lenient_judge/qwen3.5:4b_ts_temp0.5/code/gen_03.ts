import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const numbers: number[] = [];
for (const token of input.split(',').map((s) => s.trim())) {
  if (/^-?\d+$/.test(token)) {
    const n = parseInt(token, 10);
    if (!isNaN(n)) {
      numbers.push(n);
    }
  } else {
    continue;
  }
}

const uniqueNumbers: Set<number> = new Set(numbers);
let count = 0;
let sum = BigInt(0) as bigint | number; // Using Number for safety, but spec says fits in 64bit. Let's use standard int logic first then convert if needed or just treat as JS int which is safe up to 2^53-1 precision loss? Wait, "fits in 64-bit integer" means we should compute sum carefully. In Node.js Number is double (float) with ~9*10^18 range but loses precision above 2^53. The spec says the result fits in a signed 64-bit integer, so it's safe to use JS number if input values are within reasonable bounds and total doesn't overflow. But wait: "sum=<合計>" implies we should output as decimal string of sum.

Actually, since inputs can be large but fit in 64bit int range (signed), the maximum value is approx ±9e18. Summing them might exceed JS Number precision if many small values add up to >2^53? No: The problem says "合計は 64bit 整数の範囲に収まります" meaning the final sum fits in a signed 64-bit integer (max ~9*10^18). Since JS Number can represent integers exactly only up to 2^53 (~9e15), we cannot safely use plain numbers for summation if intermediate sums exceed that. However, since we know the result fits in 64bit int, maybe input values themselves are small? Not necessarily: e.g., many duplicates of large numbers would overflow sum unless they cancel out or count is low. But wait: "重複を除いた整数" means unique elements only! So if there's one huge number like 1e18 and another -1e18, their difference fits in int but individual values might not? Actually the spec says each input integer must be interpreted as an integer (probably within standard bounds). And final sum fits in 64bit signed.

To avoid precision issues with JS Number when dealing with large integers beyond 2^53, we can use BigInt for accumulation since Node.js supports it and the output format requires exact decimal representation of a number that fits in 64-bit integer (which is also representable exactly as string). But note: if the sum fits in signed 64-bit int, then converting to string via toString() works perfectly.

So let's use BigInt for safe addition:
</think>
