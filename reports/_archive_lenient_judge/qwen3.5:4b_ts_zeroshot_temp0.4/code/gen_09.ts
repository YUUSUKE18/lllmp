import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (trimmed === '') continue;
  
  // 整数として解釈できるかチェックし、数値を抽出する正規表現を使用
  const match = trimmed.match(/-?\d+/);
  if (!match || !isNaN(parseInt(match[0], 10))) {
    numbers.push(parseInt(match[0], 10));
  }
}

const uniqueNumbers = new Set(numbers.map(Number)).values(); // TypeScript の型推論を考慮して直接数値配列として扱うため、Set を使うが内部は number である。実際には Set<number> が適切だが、JS では value ではなく spread で展開する必要があるか？いや、`[...uniqueNumbers]` で OK。
// より正確に：重複を除いた整数の個数をカウントし、合計を計算

const uniqueSet = new Set(numbers); // numbers は number[] なので直接使用可能 (parseInt の結果)
let count = 0;
let sum: bigint | number = BigInt(0);

for (const num of uniqueSet.values()) {
    if (!Number.isInteger(num)) continue; 
    // parseInt で取得した数値は常に整数ですが、安全のために確認。実際にはすべて整数であるべき。
    
    count++;
    
    // 合計を計算する際、BigInt を使用してオーバーフローを防ぐ (要件: 64bit integer)
    sum += BigInt(num);
}

// 出力形式の厳密な書き出し
console.log(`count=${count} sum=${sum}`);
