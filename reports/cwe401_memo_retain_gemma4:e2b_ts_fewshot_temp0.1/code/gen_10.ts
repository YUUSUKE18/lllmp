const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_steps = 0;
let line_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1に到達するまでの手数は0
    // このクエリ自体は手数を加算しない（nがクエリの開始値であるため）
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    // 既に計算済みの結果を合計に加算
    total_steps += memo.get(n);
    return;
  }

  // 再帰的または反復的に計算
  let current_n = n;
  let steps = 0;
  const path: number[] = [];

  while (current_n !== 1) {
    if (memo.has(current_n)) {
      // 途中でメモ化された値に到達した場合
      steps += memo.get(current_n);
      break;
    }
    
    path.push(current_n);

    if (current_n % 2 === 0) {
      current_n = current_n / 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps++;
  }

  // 1に到達した後のステップ数を計算し、メモ化する
  if (current_n === 1) {
    // 最後のステップを考慮して合計を計算
    // pathの長さがステップ数になる
    steps = path.length;
    
    // 経路上の各ステップをメモ化する（これは、nから1への経路上の各ステップの数を求めるのではなく、
    // nから1への経路の長さを求める問題なので、nから1への最短経路の長さを求める）
    // ここでは、nから1への操作の回数を数える。
    
    // 再計算して、nから1への操作回数を正確に数える
    let count = 0;
    let temp_n = n;
    while (temp_n !== 1) {
        if (temp_n % 2 === 0) {
            temp_n /= 2;
        } else {
            temp_n = 3 * temp_n + 1;
        }
        count++;
    }
    
    memo.set(n, count);
    total_steps += count;
  }
});

rl.on('close', () => {
  console.log(`total=${total_steps}`);
});
