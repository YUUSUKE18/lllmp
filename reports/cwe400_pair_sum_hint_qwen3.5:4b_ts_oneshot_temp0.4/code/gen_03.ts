const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let targetVal: bigint | null = null;
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    
    if (targetVal === null) {
      targetVal = BigInt(n);
      break;
    } else {
      // 目標値が設定されたら、残りの行を処理する
      const val = BigInt(n);
      pairs++;
    }
  }
  
  console.log(`pairs=${pairs}`);
});

let pairs: bigint = 0n;
const seen: Set<bigint> = new Set();

// 目標値を読み込むロジックを再構築して、実際の処理フローにする
// Node.js のストリーム処理は非同期なので、データが揃うのを待つ必要がある。
// しかし、上記の例では `data` アレイに全データを蓄積してから処理している。
// そのままの構造を活かし、目標値を読み取った後に、残りのデータから処理を行う。

const inputLines = s.split(/\r?\n/);

let targetVal: bigint | null = null;

for (let i = 0; i < inputLines.length; i++) {
  const line = inputLines[i];
  if (line.trim() === "") continue;
  
  let n: number;
  try {
    n = parseInt(line, 10);
  } catch {
    continue;
  }
  
  const val = BigInt(n);
  
  if (targetVal === null) {
    targetVal = val;
    // 目標値をセットしたら、以降の行で処理を開始するフラグを立てる必要があるが、
    // ここでは単純に `i` をインクリメントしてループを続ける。
    // しかし、`targetVal` が null のまま処理を進めると、最初の整数が目標値とみなされてしまう。
    // 問題文: "標準入力の 1 行目に目標値が与えられます。" -> 1 行目 (index 0) が目標値。
    // "2 行目以降には整数..." -> index 1 から処理対象。
    
    if (i === 0) {
      targetVal = val;
      continue;
    }
  } else {
    // 目標値がセットされたら、処理開始
    if (!seen.has(val)) {
      seen.add(val);
      pairs++;
    }
  }
}

// 上記のロジックは少し不正確。`pairs` は足し算ではなく、重複組の数。
// 問題文: "足して目標値になる 2 個の組（位置が異なる 2 個）の個数"
// これは典型的な 3SUM の特殊ケース (target = a + b) です。
// O(N^2) で解く必要があります。

// 修正したロジック:
// 1. 目標値を読み込む。
// 2. 残りの数字を配列に保存。
// 3. 二重ループで組み合わせを確認する。

const nums: bigint[] = [];
let targetValBig: bigint | null = null;

for (let i = 0; i < inputLines.length; i++) {
  const line = inputLines[i];
  if (line.trim() === "") continue;
  
  let n: number;
  try {
    n = parseInt(line, 10);
  } catch {
    continue;
  }
  
  const val = BigInt(n);
  
  if (targetValBig === null) {
    targetValBig = val;
  } else {
    nums.push(val);
  }
}

if (targetValBig === null || nums.length < 2) {
  console.log(`pairs=0`);
  return;
}

let count: bigint = 0n;

// 二重ループで組み合わせを探す
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    const sum = nums[i] + nums[j];
    if (sum === targetValBig) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
