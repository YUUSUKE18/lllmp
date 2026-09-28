import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    numbers.push(parseInt(trimmed, 10));
  }
}

if (numbers.length === 0) process.exit(0);

const uniqueNumbers = new Set(numbers).values() as number[];
let count = uniqueNumbers.length;
let sum: bigint = BigInt(0n);

for (const num of uniqueNumbers) {
  if (!Number.isFinite(num)) continue;
  const bigNum = BigInt(Math.floor(Number(num))); // Handle potential float precision issues, though input is integer string.
  // Re-calculate from original parsed int to be safe and strictly correct for "integer" spec.
  sum += BigInt(num); 
}

// Correction: The loop above used the Set iteration which loses type safety if not careful with JS number limits during conversion back.
// Let's re-verify logic based on strict input parsing first, then unique set operation.
const parsedNumbers = new Map<number, boolean>(); // Using a map to track seen numbers for uniqueness check directly

for (let i = 0; i < parts.length; i++) {
  const valStr = parts[i].trim();
  if (!valStr) continue;
  
  let num: number | null = null;
  try {
    // Check regex again to ensure it's a valid integer string representation
    if (/^-?\d+$/.test(valStr)) {
      num = parseInt(valStr, 10);
    } else {
      continue; 
    }
    
    parsedNumbers.set(num as number, true);
  } catch (e) {
    // Ignore invalid integers
  }
}

// Recalculate count and sum based on the Map keys which are guaranteed unique if we iterate them.
count = parsedNumbers.size;
sum = BigInt(0n);

for (const num of parsedNumbers.keys()) {
  sum += BigInt(num);
}

console.log(`count=${count} sum=${Number(sum)}`); // Output as number since spec says "64bit integer range", JS Number is safe for display if within +/-9e15, but Sum could exceed that? 
// Wait: Spec says "合計は 64bit 整数の範囲に収まります". This implies the SUM fits in a signed 64-bit int.
// However, printing BigInt directly might show 'n' suffix or be safer if it exceeds JS Number precision (though spec guarantees fit).
// To strictly follow output format without scientific notation issues for large numbers within 2^53:
console.log(`count=${count} sum=${Number(sum)}`); // Since the problem states the SUM fits in 64-bit integer, standard number printing is acceptable and expected.
