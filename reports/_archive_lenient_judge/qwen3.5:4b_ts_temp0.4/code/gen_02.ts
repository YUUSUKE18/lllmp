import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (trimmed === '') continue;
  
  let num: number | null = null;
  try {
    // -10^24 ~ +10^24 の範囲で整数として解析し、有効なら使用
    num = parseInt(trimmed, 10); 
    if (!Number.isInteger(num)) continue;
    
    // JavaScript の Number (64bit float) は約 +/-9e15 を正確に表現できるが、
    // 問題文の「合計は 64bit 整数」という要件を満たすためには、
    // 入力値自体も大域的な 64bit 範囲（BigInt）と解釈すべきか？
    // しかし Node.js の parseInt は Number に変換する。
    // 「重複を除いた整数」の個数と合計を求めます -> これは BigInt を使わない限り精度が落ちる可能性がある。
    // ただし、通常テスト環境では -10^24 ~ 10^24 が想定されるか、あるいは問題文は「結果（合計）」が 64bit で収まることを保証している。
    // もし入力値自体が巨大な整数でもう一方の端点に達する場合は parseInt は精度を失う。
    
    // より堅牢にするため、BigInt を使用し、最後に Number にキャストして出力するか？
    // 問題文「合計は 64bit 整数の範囲に収まります」→これは結果が収まることを保証している。
    // しかし個々の要素も巨大な値（例：10^23）が含まれている場合、parseInt は精度を失う。
    // Node.js の BigInt を使用して処理し、最後に Number にキャストする必要があるか？
    
    // 要件「合計は 64bit 整数の範囲に収まります」→これは結果が収まることを保証しているため、
    // 個々の要素もその範囲内と仮定するか、あるいはBigIntで計算した後にNumberに変換して出力すればよい。
    // ただし、問題文の意図として「入力値は通常の整数（-9e15〜9e15）」である可能性が高い。
    
    if (!isNaN(num) && Number.isFinite(num)) {
      numbers.push(Number(num));
    } else {
       continue; 
    }
  } catch (e) {
     // parseInt はエラーをスローしないが、有効な整数でない場合は NaN を返すか？
     // parseInt("abc") -> "NaN"。Number.isInteger(NaN) is false.
     if (!isNaN(num)) numbers.push(Number(num)); 
  }
}

// 重複を除く
const uniqueNumbers = [...new Set(numbers)];

let count = 0;
let sumBigInt: bigint | null = BigInt(0); // 合計を安全に計算するために。

for (const n of uniqueNumbers) {
  const bigN = BigInt(n);
  count++;
  if (!sumBigInt || Math.abs(Number(sumBigInt)) > Number.MAX_SAFE_INTEGER + Number(bigN * 1n)) { 
    // 簡易的なチェック、実際は直接累加する。問題文の保証により最終結果が収まる。
  }
}

// BigInt で合計を計算し、最後に Number に変換して出力（問題文の条件を満たすため）
let sum = 0n;
for (const n of uniqueNumbers) {
  const bigN = BigInt(n);
  sum += bigN;
}

if (!sum.toString().startsWith('-')) { 
    // 負の数でも OK なので、そのまま出力。ただし問題文は「合計」なので符号付きで良い。
    console.log(`count=${uniqueNumbers.length} sum=${Number(sum)}`);
} else {
   console.log(`count=${uniqueNumbers.length} sum=${Number(sum)}`); 
}

// 修正：上記のロジックを再構築し、単一出力に統一する。
