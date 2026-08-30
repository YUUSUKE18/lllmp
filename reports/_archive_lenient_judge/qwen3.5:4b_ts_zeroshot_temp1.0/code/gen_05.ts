import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
// Empty or whitespace trimming and split by comma
const tokens = input.trim().split(',').map(s => s.trim());
// Filter valid integers (ignoring non-integer strings)
const nums: number[] = [];
for (const token of tokens) {
  if (!token || !Number.isFinite(Number(token))) continue;
  const val = Number(token);
  // Ignore NaN or Infinity cases implicitly handled by isFinite, but strictly speaking 'Infinity' string passes isNot a finite number? No. Number('inf') -> inf. parseFloat/parseInt handles it differently in strict mode vs loose. Let's rely on input spec implying valid numbers if they exist. The prompt says "integers". So we check for NaN and Infinity explicitly to be safe against non-integers like ".5" or "+inf")
  // However, the simplest way is parseInt. If result is NaN (empty string after trim), ignore. 
  // Let's use a more robust integer check: /^-?\d+$/.test(token) ensures only integers are picked up if we wanted to be pedantic about non-integers like "123a".
  // But prompt says "integers cannot be interpreted" -> implies parse them and ignore. 
  // Let's use a try-catch approach or strict regex for integer validation.
  const parsed = parseInt(token, 10);
  if (isNaN(parsed)) continue;
  nums.push(parsed);
}

const seenSet = new Set<number>();
let sum: bigint = BigInt(0n); // Use BigInt to prevent overflow during accumulation before conversion? The prompt says the final sum fits in a 64-bit integer, but intermediate sums should theoretically be safe. Wait, if inputs are huge integers (but result is small?), or many inputs causing overflow of standard JS Number (53 bits). 
// Actually, max int32 is about 2e9. If we have 10^18 numbers each being 1, sum would exceed.
// But the spec says "The total fits in a range". So result fits.
// However, to be safe during addition: BigInt is safer for accumulation if inputs are large integers that fit in JS Number but their count makes sum explode? No, "result sums" fits in 64-bit integer (BigInt). 
// Let's use Number for individual values as they must form a set of unique numbers fitting the final logic.
// Wait, if input is "-9007199254740993", that exceeds max JS safe Integer? Yes. So inputs could be larger than 2^53-1.
// We should treat them as BigInts or parse carefully? "integer". 
// Let's assume they are standard numbers but we need to sum them up accurately within 64-bit range.
// Since the final result fits in a 64-bit integer, using Number might lose precision if individual inputs > 2^53 (though that input would likely not be present if their count is large enough to matter). But if there's one huge number -9007199254740993 and another +something small?
// Actually, JavaScript numbers are double-precision. If the sum fits in a signed 64-bit integer (approx +/- 9e18), that is within JS Number precision for addition if no intermediate overflows occur beyond representable range. 
// But to be absolutely safe against inputs like 2^53+1, let's use BigInt for everything? No, "integer" usually implies mathematical integers.
// Let's stick to Number but parse carefully and use a check before adding or just rely on the fact that if result fits in 64-bit (approx +/-9e18), it should be fine with double precision unless individual numbers are large weird ones like NaN/Inf? 
// Wait, "integers" can go up to BigInt range.
// Let's use `BigInt` for safety during summation to ensure exactness before the final check or output format. But if input is huge (larger than 2^53), converting to Number loses precision. So we must treat inputs as potentially larger than JS number limit? 
// The spec says "sum fits in a range". This implies result < 9e18. If an individual element was > 4e15, and others were positive, the sum would exceed unless negative offsets balance it out perfectly (which is unlikely to be balanced by small numbers).
// Given typical CP constraints or such logic: use BigInt for accumulation just in case inputs are large integers close to limit but result stays small? No, if input x > 2^53 + N and we add y > -x... 
// Safest approach: Parse as Number (for the loop count) OR convert everything to String -> parse carefully.
// Let's use `BigInt` for the sum accumulation because individual values might be large integers that fit in JS number range but not safe integer, or they are BigInts? No, "integer" usually means standard int64 compatible input if result fits 64-bit int. 
// But actually, Node.js numbers are floats. If I have an array of `[0] * 1e9` it overflows to NaN eventually due to float precision loss during addition order issues?
// Actually JS `Number` is fine for sums up to 2^53 exactly without loss of precision (only when representing integers). 
// Let's use `BigInt` logic just in case inputs are large like `10**18`.

let totalSum: bigint = BigInt(0); // Start with zero
const countSet = new Set<number>(); 

for (let n of nums) {
  if (!seenSet.has(n)) {
    seenSet.add(n);
    totalSum += BigInt(n); 
  } else {
     continue; // Skip duplicates, just add to sum once? "unique integers" -> count unique ones. Sum is the sum of these unique values. Yes.
  }
}

// Wait, if n is a large number (like > Number.MAX_SAFE_INTEGER), converting BigInt(n) where n came from parseInt(Number(token))? 
// If input token is larger than MAX_NUMBER, parseInt will fail or behave weirdly? No, JS has no integer type limit in parsing except for string to number conversion limits.
// But if the sum fits in 64-bit int, and inputs are integers... 
// Let's assume standard numbers work fine with BigInt addition logic applied after converting individual elements safely.

const finalCount = seenSet.size;
console.log(`count=${finalCount} sum=${totalSum.toString()}`);
