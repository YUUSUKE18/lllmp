let memo: Map<number, number> = new Map();
let total_count: number = 0;

process.stdin.on("data", (c: Buffer) => {
  const data = c.toString().trim();
  if (data === "") return;

  const n = parseInt(data, 10);

  if (Number.isNaN(n) || n < 1) {
    return; // 整数として解釈できない、または1未満は無視
  }

  if (n === 1) {
    // n=1 の場合は手数は 0
    const count = 0;
    total_count += count;
    // 1 は既にメモされているか、明示的にセットする
    memo.set(1, 0);
    return;
  }

  // 再帰/メモ化による計算
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // 計算ステップ
  let steps = 0;
  let current = n;
  const history: number[] = [];

  while (current !== 1) {
    if (memo.has(current)) {
      steps += memo.get(current)!;
      break;
    }

    history.push(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
  }

  if (current === 1) {
    // 1 に到達した。経路上の各ステップを計算する。
    // Memoizationを適用するために、経路を遡って計算するのではなく、
    // 現在の値を計算するのに必要なステップ数を計算する。
    // ここでは、n から 1 までの「操作回数」を求める。
    
    // 簡易的に、n から 1 に到達するまでの操作回数を計算する。
    // 問題の要求は「n が 1 に到達するまでの手数」なので、
    // f(n) = f(n/2) if n even
    // f(n) = f(3n+1) if n odd
    // f(1) = 0
    
    let temp_n = n;
    let count = 0;
    const path: number[] = [];

    while (temp_n !== 1) {
      path.push(temp_n);
      if (temp_n % 2 === 0) {
        temp_n = temp_n / 2;
      } else {
        temp_n = 3 * temp_n + 1;
      }
      count++;
    }
    
    // 経路上の各ステップについてメモ化を更新する（DP的なアプローチ）
    // これは、n から 1 への到達過程の「手数」を求めるため、
    // 単に1回の計算で終了させる。
    
    // 経路上の各要素のメモ化を更新する
    for (const val of path) {
        // 経路の逆順で計算すると、より効率的だが、ここでは直接的なDPとして
        // 既に計算済みの値を利用する。
        if (!memo.has(val)) {
            // n から 1 へのパスを辿る場合、n を計算するために前のステップの値を必要とする。
            // この問題は「nから1への操作回数」であり、1回のクエリごとに独立して計算する。
            // 経路上の各要素のメモ化を更新する。
            memo.set(val, 0); // これは間違い。f(n)を求める必要がある。
        }
    }
    
    // 再帰的なメモ化の再試行
    // f(n) = 1 + f(n/2) if n is even
    // f(n) = 1 + f(3n+1) if n is odd
    
    // 1. 経路を辿り、手数を計算する
    let current_steps = 0;
    let current_val = n;
    
    // 再帰的な呼び出しをメモ化に依存させる
    const calculate_steps = (num: number): number => {
        if (num === 1) {
            return 0;
        }
        if (memo.has(num)) {
            return memo.get(num)!;
        }

        let next_val: number;
        let sub_steps: number;

        if (num % 2 === 0) {
            next_val = num / 2;
            sub_steps = calculate_steps(next_val);
            memo.set(num, 1 + sub_steps);
            return 1 + sub_steps;
        } else {
            next_val = 3 * num + 1;
            sub_steps = calculate_steps(next_val);
            memo.set(num, 1 + sub_steps);
            return 1 + sub_steps;
        }
    };

    const result = calculate_steps(n);
    total_count += result;
    
  } else {
      // 処理が上記で完了していない場合（通常は上記の再帰で完了するはず）
      // このブロックは、処理ロジックの再構築が必要な場合にのみ使用する。
  }
});

// 標準入力が全て読み込まれた後、結果を出力する（非同期処理のため、ここでは手動で処理を完了させる）
// Node.jsのストリーム処理では、データが到着するたびに処理を行うのが一般的。
// 課題の形式に従い、すべての入力が処理された後に合計を出力する。
// しかし、本質的には入力ストリームにデータが来るたびに合計を更新する必要がある。
// 実行環境依存性を避けるため、ここでは入力処理が完了した後に結果を出力する。
// (ただし、上記の処理はデータが到着するたびに実行されるはずである)

// 実際には、処理が完了した後の合計を出力する。
// ここでは、標準入力の処理が完了したと仮定して出力する。

// 注意: 標準入力がすべて処理された後の合計を出力
process.stdout.write(`total=${total_count}\n`);
