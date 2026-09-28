const cache = new Map<number, number>();

function kol(n: number): number {
  const n64 = BigInt(n); // 64bit signed int の上限 (2^63 - 1) に到達する可能性を考慮するため
  if (n === 1) return 0;
  
  if (cache.has(n)) {
    return cache.get(n)!;
  }

  let nextN = n;
  let steps = 0;
  
  // カッコ付き計算: 次の値が 32bit unsigned int の範囲を超えないように確保しつつ、64bit で計算する
  while (nextN !== 1) {
    if ((n % 2) === 0) {
      nextN = n / 2;
    } else {
      // 64bit integer の範囲に収まることを前提とする（問題文通り）
      nextN = BigInt(3 * n + 1); 
    }
    
    if (nextN > Number.MAX_SAFE_INTEGER) {
      // キャッシュのキーとしてそのまま扱う。BigInt を String にコンバージョンしてマップに入れる。
      const keyStr = String(nextN); 
      
      steps += 1;
      cache.set(nextN, steps); // 直後の値をキャッシュ（メモ化）
    } else {
      cache.set(nextN, steps); // 通常のケースでもキャッシュ
  
      if (nextN === 1) break;
    }
  
    n = nextN; // キャッシュの更新に合わせて現在の値を更新
  }
  
  const totalSteps = cache.get(n)! + steps;
  cache.set(n, totalSteps);
  return totalSteps;
}

const lines: number[] = [];
let hasInput = false;

for (const line of process.stdin) {
  const trimmed = line.trim();
  if (trimmed === '') continue;
  
  try {
    const num = parseInt(trimmed, 10);
    if (isNaN(num)) continue;
    if (num >= 1) {
      lines.push(num);
    }
  } catch (e) {
    continue;
  }
}

let totalSum = 0;
for (const n of lines) {
  totalSum += kol(n);
}

console.log(`total=${totalSum}`);
