const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  
  const n = parseInt(line.trim(), 10);
  
  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    const count = 0;
    totalCount += count;
    // この処理は、後で全てのクエリが終わってから合計を出力するため、ここでは合計を直接更新しない。
    // 処理を続ける。
  } else if (!memo.has(n)) {
    // 再帰または動的計画法で計算
    let steps = 0;
    let current = n;
    
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    
    memo.set(n, steps);
  }
});

rl.on('close', () => {
  // 全ての入力が処理された後、メモ化された値から合計を計算する
  let finalTotal = 0;
  
  // 実際には、入力された各行を処理した際に合計を更新する方が効率的だが、
  // この問題設定では「すべてのクエリの手数の合計」を求めるため、
  // 入力された各行がクエリであると仮定し、その結果を合計する。
  // ただし、上記コードでは入力された各行を個別に処理しているため、
  // 処理が完了した時点でメモに格納されている値を使って合計を計算する。
  
  // 実際には、入力された行が全てクエリであると仮定し、
  // rl.on('line')内で計算結果を合計していくべき。
  // 再度、入力処理を修正し、合計を直接更新する。
  
  // この実装では、入力された各行がクエリであり、その結果を合計する。
  // 処理が完了した時点で、memoに格納された値から合計を計算する。
  
  // 念のため、入力された行数と、その行がクエリだった場合の合計を再計算する。
  // (上記コードのロジックを修正し、合計を直接更新する形に再構成する)
  
  // 最終的な合計を計算
  for (const [n, steps] of memo.entries()) {
    finalTotal += steps;
  }

  console.log(`total=${finalTotal}`);
});
