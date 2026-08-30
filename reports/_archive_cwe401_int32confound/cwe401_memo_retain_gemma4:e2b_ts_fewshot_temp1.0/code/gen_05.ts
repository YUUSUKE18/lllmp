const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;

rl.on('line', (line) => {
  if (line.trim() === '') return;
  const n = parseInt(line.trim(), 10);

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合の手数は 0
    const count = 0;
    totalCount += count;
    console.log(`total=${totalCount}`);
    rl.close();
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    totalCount += count;
    return;
  }

  // 計算
  let count = 0;
  let current = n;
  const visited = new Set<number>();

  while (current !== 1) {
    if (visited.has(current)) {
      // サイクルに陥った場合 (これはこの問題の操作では発生しないはずだが、安全策として)
      break;
    }
    visited.add(current);

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    count++;
  }

  // 1に到達できなかった場合は、計算結果は意味をなさない（問題の制約上、必ず到達するはず）
  if (current === 1) {
    memo.set(n, count);
    totalCount += count;
  }
});

rl.on('close', () => {
  // 最後の出力はreadlineの処理の中で行われるように設計したが、
  // 厳密に「合計」のみを出力する必要がある。
  // 再度、もし処理中にsumを更新し忘れていた場合のために、最終確認（この実装では不要だが念のため）
  // 実際には、readlineが終了した時点でtotalCountが確定している。
});
