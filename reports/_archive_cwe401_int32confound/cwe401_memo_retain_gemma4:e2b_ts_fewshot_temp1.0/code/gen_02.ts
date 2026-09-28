const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") return;

  const n = parseInt(trimmedLine, 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    // memo.set(1, 0); // 1 は終端なので明示的に設定しなくても良いが、念のため
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    totalCount += count;
    return;
  }

  // 再帰または反復計算
  let steps = 0;
  let currentN = n;

  while (currentN !== 1) {
    if (memo.has(currentN)) {
      // 既に計算済みの値に到達した場合、その値を加算して終了
      totalCount += memo.get(currentN)!;
      break;
    }
    
    if (currentN % 2 === 0) {
      currentN = currentN / 2;
    } else {
      currentN = 3 * currentN + 1;
    }
    steps++;

    // 循環を防ぐための安全策（実際には1に収束するため不要だが、念のため）
    if (steps > 1000000) {
        // 非常に大きな値になった場合、計算を打ち切る（この問題設定では発生しないはず）
        break;
    }
  }

  // 最終的な結果をメモ化
  if (currentN === 1) {
    // 最後に到達した値から遡って合計を計算する方が効率的だが、
    // 今回の要件は「各クエリの手数の合計」なので、nから1までのステップ数を計算する。
    // 非常に大きな数まで計算するのではなく、nから1へのパスを辿る。
    
    // 再帰的な構造で考える方が、メモ化の恩恵を受けやすい
    // n -> f(n)
    
    // ここでは、nから1へのステップ数を直接求める
    let count = 0;
    let tempN = n;
    while (tempN !== 1) {
        if (tempN % 2 === 0) {
            tempN /= 2;
        } else {
            tempN = 3 * tempN + 1;
        }
        count++;
    }
    
    memo.set(n, count);
    totalCount += count;
  }
});

rl.on('close', () => {
  console.log(`total=${totalCount}`);
});
