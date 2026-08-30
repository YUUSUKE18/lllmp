const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_number = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合、手数は 0
    const result = 0;
    if (!memo.has(1)) {
      memo.set(1, result);
    }
    // この問題では、n=1への到達数を求めるため、n=1の計算結果を直接加算するのではなく、
    // 後の計算で参照されるように、nから1へのパスを計算する
    // ここでは、nがクエリとして与えられた場合の計算結果を求めるため、
    // n=1への到達数を計算する関数を定義し、それを呼び出す形にする。
    // しかし、仕様は「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
    // これは、nから1へのパスの長さを求める問題である。

    // 再度仕様を解釈する: nから1への操作の回数を求める。
    // n=1 -> 0回
    // n=2 -> 2->1 (1回)
    // n=3 -> 3->10->5->16->8->4->2->1 (7回)
    // 繰り返し操作を適用する過程の回数を数える。

    // 状態遷移:
    // f(n) = n == 1 ? 0 : (n % 2 === 0 ? f(n / 2) : f(3 * n + 1))

    // ここでは、nから1へのパスの長さを求める。
    // n=1 の場合、手数は 0。
    if (n === 1) {
      // n=1 の場合、手数は 0。
      // 実際には、このnがクエリとして与えられた場合の計算結果を求める。
      // 1から1へのパスは0。
      // このnがクエリとして与えられた場合、nから1へのパスを計算する。
      // 1から1へのパスは0。
      // memo.set(1, 0); // これは既に定義済み
    }
    
    // nがクエリとして与えられた場合の計算を再定義する。
    // 実際には、nが入力されるたびに、nから1へのパスを計算し、その結果を合計する。
    // したがって、memoはnから1へのパスの長さを格納する。
    
    // n=1 の場合、手数は 0。
    if (!memo.has(n)) {
        memo.set(n, 0);
    }
    
  } else if (memo.has(n)) {
    // メモ化された結果があればスキップ
  } else {
    // n > 1 の場合、再帰的または反復的に計算
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
    }
    memo.set(n, count);
  }
});

rl.on('end', () => {
  // すべての入力が処理された後、memo内の値の合計を計算する。
  // ただし、入力された行がクエリの集合であるため、memo内の全キー（入力されたn）に対応する値を合計する。
  // 実際には、readlineで受け取った各行が1つのクエリに対応している。
  
  // 処理されたすべての入力行（n）について、計算結果を合計する。
  // この問題設定では、readlineで受け取った各行がクエリであり、その結果を合計する。
  
  // 処理されたすべての行を再走査して合計を計算する代わりに、
  // 処理中に合計を更新する方が効率的だが、readlineの構造上、ここでは最終的な結果を出す。
  
  // 実際には、readlineのイベント内で合計を更新するべきだが、
  // ここでは、memoに格納された値の合計を求める。
  
  let total = 0;
  // 実際には、入力されたすべてのnについて計算結果を合計する。
  // readlineのイベントでnが処理された際に合計を更新する。
  
  // 簡略化のため、readlineのイベント内で合計を更新するロジックを修正する。
  // ここでは、readlineのイベント内で合計を更新するようにコードを修正する。
});

// 修正されたロジック: readlineイベント内で合計を更新する
const rl_fixed = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let final_total = 0;

rl_fixed.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合、手数は 0
    if (!memo.has(1)) {
      memo.set(1, 0);
    }
  } else if (!memo.has(n)) {
    // n > 1 の場合、計算
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
    }
    memo.set(n, count);
  }
});

rl_fixed.on('end', () => {
  // すべての入力が処理された後、memo内の値の合計を計算する。
  for (const count of memo.values()) {
    final_total += count;
  }
  console.log(`total=${final_total}`);
});
