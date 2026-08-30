import * as fs from "fs";

const input = fs.readFileSync(0, { encoding: "utf8" });
const lines = input.split("\n");

// 空白行と整数ではない行を除外し、有効な整数だけを抽出
let targetValue: bigint | null = null;
const integers: bigint[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue; // 空行は無視

  const token = BigInt(line);
  
  if (i === 0 && Number(token) === parseInt(String(token)) && !isNaN(parseInt(String(token)))) {
    // 第一行が整数として解釈可能である場合、目標値とみなす
    targetValue = token;
    continue; 
  }

  integers.push(token);
}

if (targetValue === null || integers.length < 2) {
  console.log("pairs=0\n");
  process.exit(0);
}

// パリティごとにグループ分け（奇数/偶数の和の性質を利用）
const odd: bigint[] = [];
const even: bigint[] = [];

for (const num of integers) {
  if (num % 2n === 1n) {
    odd.push(num);
  } else {
    even.push(num);
  }
}

// チェックリストを作成（セットの代わり、重複を含む場合は多重セットが必要だが、ここで単純に並べ替え）
function checkSum(set: bigint[], targetSum: bigint): number {
  if (set.length < 2) return 0;
  
  // バイソルタ法ではなく、単純な二重ループまたはハッシュマップ（外部パッケージ禁止のため単体実装なし、直接配列比較を使用）
  // ハッシュマップの実装はシンプルに

  let count = 0n;
  const sumSet = new Set<string>(); // キー: "val#index", バリュー: 値の文字列

  // チェックリストの構築と検索
  for (let i = set.length - 1; i >= 0; i--) {
    let currentVal = set[i];
    const target = targetSum - currentVal;
    
    // ハッシュマップの実装（配列またはオブジェクトを使う）
    // key: "val" , value: index
    
    if (sumSet.has(String(target))) {
      count += 1n;
    }
  }

  return count.toString();
}

// ハッシュマップの代わりに単純な検索ループ（効率的に計算）
let result = 0n;
const sortedArray: bigint[] = [...integers].sort((a, b) => a < b ? -1 : 1); // ソート済み配列作成

// ソート済み配列を用いた二分探索や双方向探索は、単純に二重ループで行う（大規模化への対応は不要と仮定）
// しかし、配列要素が多数ある場合、O(n^2) は遅い。ハッシュマップを作成する必要がある。

// ハッシュマップ作成
const valueToIndices: Map<string, Set<number>> = new Map();
for (let i = 0; i < integers.length; i++) {
  const valStr = integers[i].toString();
  if (!valueToIndices.has(valStr)) {
    valueToIndices.set(valStr, new Set());
  }
  valueToIndices.get(valStr)!.add(i);
}

// ハッシュマップを用いた組み合わせの計算
for (let i = 0; i < integers.length; i++) {
  for (let j = i + 1; j < integers.length; j++) {
    if (integers[i] + integers[j] === targetValue) {
      result++;
    }
  }
}

console.log(`pairs=${result}\n`);
