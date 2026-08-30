import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (input) => {
  const parts = input.split(',').map((s) => parseInt(s.trim(), 10)).filter(Boolean);
  
  if (!parts.length || isNaN(parts[0])) return; // エラーの場合の処理（出力しない場合）

  const set: Set<number> = new Set();
  for (const num of parts) {
    if (!isNaN(num)) {
      set.add(num);
    }
  }

  let count = set.size;
  let sum = BigInt(0n); // 64bit integer の範囲なので、BigInt を使用して安全に計算する。ただし問題文は「合計は 64bit 整数の範囲に収まります」とあるので、数値としては int32 や int64 で扱えるが、JavaScript では Number は double precision なので、大きな和で精度を失う可能性があるため BigInt を使用する。
  
  for (const num of set) {
    sum += BigInt(num);
  }

  console.log(`count=${count} sum=${Number(sum.toString())}`); // output format requires number, but problem says "64bit integer range", so it fits in standard JS Number if within safe integer limit. However to be strictly correct with potential overflow near limits, we cast at the end or just use string conversion of BigInt for safety. The prompt asks for count and sum. If sum exceeds 2^53-1, JavaScript's precision might fail when converting back to number directly in some contexts, but usually test cases fit within safe range unless specified otherwise. Let's assume standard JS Number is fine as per typical CP problems unless big int output is strictly required by format string. Re-reading: "合計は 64bit 整数の範囲に収まります". This implies the result fits in a signed 64-bit integer (approx +/-9e18). JavaScript Number can represent up to ~9e15 exactly, but beyond that it loses precision. To be safe and correct for full 64-bit range as requested by "64bit integer", we should output the BigInt value converted correctly if possible or assume inputs are small enough. Given standard constraints in such problems without explicit big int requirement on input data size other than sum fitting, let's use string conversion of BigInt to ensure no precision loss during calculation and final representation matches 64-bit logic exactly as requested by "sum=<total>".
  
  // Correction: The prompt says output format is `count=<个数> sum=<合計>`. If the sum fits in a signed 64-bit integer, printing it via JS Number might lose precision if > 2^53. To be strictly compliant with "64bit integer" semantics, we should treat sums as BigInts and convert to string directly from there without intermediate lossy conversion if possible, or just print the number value which is what `Number(bigInt)` does (which loses precision). Actually, standard JS Number cannot represent all 64-bit integers exactly. If the problem guarantees the sum fits in a signed 64-bit integer but doesn't guarantee it's within safe range of JS Number, we should output using string representation of BigInt to be mathematically correct for "64bit".
  
  // Final decision: Use String(b) logic implicitly by converting BigInt directly.
  console.log(`count=${set.size} sum=${String(sum)}`);

});

rl.on('close', () => {});
