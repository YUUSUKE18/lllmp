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

  if (isNaN(n) || n < 1) return;

  if (n === 1) {
    // n=1 の場合の手数は 0
    const current_count = 0;
    total_count += current_count;
    process.stdout.write(`total=${total_count}\n`);
    rl.close();
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // 再帰的または反復的に計算
  let steps = 0;
  let current = n;
  const history: number[] = [n];

  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    history.push(current);
  }
  // 1に到達するまでのステップ数は履歴の長さ - 1 (開始値nを含めてカウント)
  // ただし、n=1の場合は0ステップ。ここではnの変換操作の回数を数える。
  // nを1に到達するまでの操作回数を数える。
  // n=1の時は0。n=2の時は2->1 (1回)。n=3の時は3->10->5->16->8->4->2->1 (7回)。
  // 履歴の要素数が操作回数に直接対応しないため、再帰/メモ化の考え方に合わせる。

  // ここでは、nから1に到達するまでの操作回数を計算し、それを合計に加算する。
  // メモ化された結果を計算する。
  
  // 再帰的なメモ化による計算を試みる
  const calculate_steps = (k: number): number => {
    if (k === 1) return 0;
    if (memo.has(k)) return memo.get(k)!;

    let result: number;
    if (k % 2 === 0) {
      result = calculate_steps(k / 2) + 1;
    } else {
      result = calculate_steps(3 * k + 1) + 1;
    }
    
    memo.set(k, result);
    return result;
  };

  const steps_for_n = calculate_steps(n);
  total_count += steps_for_n;
});

rl.on('close', () => {
  // 最後の出力が処理されていれば、既にファイルに書き込まれているはずだが、
  // 念のため、まだ出力されていなければここで出力する。（上記ロジックではn=1で終了時に出力しているため、このブロックは通常実行されないか、処理が複雑になる）
  // 上記のロジックでは、n=1の時点で終了させているため、このブロックは不要。
});
