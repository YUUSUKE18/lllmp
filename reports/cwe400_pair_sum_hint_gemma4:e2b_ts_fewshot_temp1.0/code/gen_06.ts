const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineIndex = 0;

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  if (lines.length === 0) {
    console.log('pairs=0');
    return;
  }

  // 1行目から目標値を読み取る
  const target = parseInt(lines[0].trim(), 10);
  if (isNaN(target)) {
    // 目標値が不正な場合は処理を終了（ただし仕様上は保証されていると想定）
    return;
  }

  // 2行目以降の整数を読み取る
  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i].trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (numbers.length < 2) {
    console.log('pairs=0');
    return;
  }

  let count = 0;
  const n = numbers.length;

  // 2個の組の個数を数える (O(N^2) は敵対的な入力に対して遅すぎる可能性があるため、ハッシュマップ/ソートを利用)
  // 問題文の「2 個の組」が「添字が異なる 2 個の組」を指すため、
  // a_i + a_j = target となる i != j の組の数を数える。

  // 2つのポインタ法 (Two-pointer method) を使用して O(N log N) または O(N) で解く。
  // まず、入力された数値をソートする。
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  let left = 0;
  let right = n - 1;
  let pairCount = 0;

  while (left < right) {
    const sum = sortedNumbers[left] + sortedNumbers[right];
    if (sum === target) {
      // sortedNumbers[left] と sortedNumbers[right] は異なるインデックスに対応するため、
      // 2つの異なる数値を足して目標値になるペアが見つかった。
      
      // 同じ値が複数存在する場合の扱いを考える必要がある。
      // 問題文は「2 個の組（位置が異なる 2 個の組）」を求めている。
      // 入力された元の位置（インデックス）に基づいて数えるのが最も正確。
      // ただし、入力が「2行目以降に整数が1行に1個ずつ並ぶ」という記述から、
      // 単純に「入力された値の集合からターゲットになる和の組の数」を求めることが意図されていることが多い。
      // したがって、重複を許容する和の組を数える。

      // ここでは、元のリストのインデックスが異なるペア (i, j) を数えることを目指す。
      // ソートされたリストで、現在の左側要素と右側要素がターゲットになる場合、
      // それとそれ以外の要素との組み合わせを数える必要がある。

      // --- O(N^2) で元のインデックスでチェックする方針に戻す（制約が緩ければ許容） ---
      // 敵対的入力への対応を考えると、O(N^2) はNG。
      // ターゲットが与えられた後、値の出現回数を数える方法が最も効率的。
      
      // 単純に、元のリスト上で i < j のすべてのペアをチェックし、sum == target となるものを数える。
      // (ただし、これは N^2 になるため、制約を考慮して「値を数える」方法を採用する)

      // 頻度マップで解く (O(N) + O(N^2) / O(N log N) に依存)
      
      // ターゲットを達成する和の組を数えるために、値の出現頻度を数える。
      
    } else if (sum < target) {
      left++;
    } else { // sum > target
      right--;
    }
  }
  
  // --- 頻度マップによる解法 ---
  const counts = new Map<number, number>();
  for (const num of numbers) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  let finalPairCount = 0;

  for (const [a, countA] of counts.entries()) {
    const b = target - a;

    if (a < b) {
      if (counts.has(b)) {
        const countB = counts.get(b)!;
        // a と b の組の数: countA * countB
        finalPairCount += countA * countB;
      }
    } else if (a === b) {
      // a + a = target の場合。これは同じ値が2つ存在する場合にのみカウントされる。
      // countA が 2 以上なら、C(countA, 2) = countA * (countA - 1) / 2
      if (countA >= 2) {
        finalPairCount += (countA * (countA - 1)) / 2;
      }
    }
  }

  console.log(`pairs=${finalPairCount}`);
});
