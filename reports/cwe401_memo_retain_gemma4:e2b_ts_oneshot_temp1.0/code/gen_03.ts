const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let inputLines: string[] = [];
let lineCount = 0;

rl.on('line', (line) => {
  if (lineCount === 0) {
    // 最初の行はクエリとして扱う
    inputLines.push(line.trim());
  } else {
    // 2行目以降の行は、以前の計算結果と混ざる可能性があるため、
    // 実際には入力全体を読み込んでから処理する方が安全。
    // 今回の仕様では「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」なので、
    // 入力ストリームから一行ずつ読み進める。
    inputLines.push(line.trim());
  }
  lineCount++;
});

rl.on('close', () => {
  // ここで入力された全ての行を処理する
  // 実際には、入力が与えられた際の「クエリ」として解釈し、計算を繰り返す必要がある。
  // 仕様の解釈：標準入力には「クエリ」が1行に1個ずつ並ぶ。
  // 各クエリに対して操作を繰り返し、1に到達するまでの手数を求め、その合計を求める。
  
  // 再度、標準入力から読み込んだ行を処理するロジックを実装する。
  // 読み込みは完了したが、入力の構造を再確認。
  // 「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」

  // 最初の入力はクエリ n。この n について操作を繰り返し計算する。
  // 続く入力が次のクエリ n' となる。

  let totalSteps = 0;
  let currentInputIndex = 0;

  // 標準入力から読み込んだ文字列を、整数としてパースし、計算する
  const numbers = inputLines.map(l => parseInt(l, 10)).filter(n => !isNaN(n) && n >= 1);

  for (const startN of numbers) {
    if (startN === 1) {
      totalSteps += 0;
      continue;
    }

    let currentN = startN;
    let steps = 0;
    const memo = new Map<number, number>(); // メモ化
    let history = new Set<number>(); // サイクル検出用

    while (currentN !== 1) {
      if (memo.has(currentN)) {
        // 既に計算済みの値に到達した
        steps += (steps - memo.get(currentN) + 1); // サイクルを考慮した計算（ここは仕様依存だが、ここでは単純にサイクル検出で止める）
        break; 
      }
      if (history.has(currentN)) {
        // サイクルに陥った（1に到達しない）
        break;
      }

      // メモ化と履歴記録
      memo.set(currentN, steps);
      history.add(currentN);

      // 操作の実行
      if (currentN % 2 === 0) {
        currentN /= 2;
      } else {
        currentN = 3 * currentN + 1;
      }
      steps++;
      
      // 3x+1問題では無限ループに陥る可能性があるが、今回は1に到達することを前提とする。
      // サイクル検出は、同じ値に戻ることを確認するのに役立つ。
      if (steps > 100000) break; // 安全のための打ち切り
    }
    
    // 1に到達したかどうかの確認（厳密にはサイクルチェックが重要だが、3x+1問題は通常1に収束するため）
    if (currentN === 1) {
      totalSteps += steps;
    }
  }

  console.log(`total=${totalSteps}`);
});
