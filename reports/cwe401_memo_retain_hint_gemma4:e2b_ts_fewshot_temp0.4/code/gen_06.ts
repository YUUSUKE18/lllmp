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

  if (isNaN(n)) return;

  if (n === 1) {
    // 手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n);
    return;
  }

  // 再帰的または反復的に計算
  let count = 0;
  let current_n = n;

  while (current_n !== 1) {
    if (memo.has(current_n)) {
      count += memo.get(current_n);
      break;
    }

    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    count++;
  }

  // 1に到達した後の手数をメモ化
  // ここで、memo化の目的が「nから1に到達するまでの手数」を求めることなので、
  // 実際には再帰的な構造をメモ化するのが最も効率的です。
  // 今回の課題は「すべてのクエリの手数の合計」を求めることなので、
  // 各クエリに対して個別に計算し、その合計を求める必要があります。
  // メモ化は、同じ中間値が繰り返し現れた場合に有効です。

  // 再計算とメモ化のロジックを修正します。
  // 課題の要求は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」です。
  // したがって、各入力行に対して計算を行い、その結果を合計する必要があります。

  // 既存のロジックをリセットし、各行で計算し、合計を求める形に変更します。
  // 外部のループ構造を削除し、各行で独立して計算します。
});

// 再度、標準入力全体を読み込む方式に変更します。
// 逐次処理ではなく、入力全体を一度に処理する方が、メモ化の適用が容易です。

let input_data = '';

rl.on('line', (line) => {
    input_data += line + '\n';
});

rl.on('end', () => {
    const lines = input_data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let total_sum = 0;
    const memo_map = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;

        if (n === 1) {
            total_sum += 0;
            continue;
        }

        let steps = 0;
        let current = n;
        const path: number[] = []; // パスを記録して、ループ検出を容易にする

        while (current !== 1) {
            if (memo_map.has(current)) {
                // 既に計算済みの部分があれば、そこから計算を続ける
                steps += memo_map.get(current);
                break;
            }
            
            // ループ検出のためのチェック（サイクル検出）
            if (path.includes(current)) {
                // サイクルに陥った場合、この経路での計算は停止（無限ループ回避のため、ここでは0として扱うか、エラー処理が必要だが、
                // 課題の文脈では通常、この問題は「手数を求める」ものであり、サイクルは発生しない（n=4, 2, 1）ため、
                // サイクル検出は不要だが、メモ化が重要）
                // 実際には、この問題はCollatz予想に関連しており、1に必ず到達すると仮定されます。
                // サイクルが検出された場合は、その経路の計算を終了し、手数を計算しない（またはエラーとする）べきですが、
                // ここでは単純に計算を続行します。
                break; 
            }
            
            path.push(current);

            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 最終的な手数を計算し、メモ化する
        // サイクル検出を無視し、単純な手数計算を優先します。
        // サイクル検出は、メモ化が正しく機能するための補強として残します。
        
        // サイクル検出を無視して、単純な計算を再実行し、メモ化する
        let final_steps = 0;
        let temp_n = n;
        const history: { [key: number]: number } = {}; // 経路と手数を記録

        while (temp_n !== 1) {
            if (memo_map.has(temp_n)) {
                final_steps += memo_map.get(temp_n);
                break;
            }
            
            if (history[temp_n] !== undefined) {
                // サイクル検出
                break;
            }

            history[temp_n] = final_steps;

            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            final_steps++;
        }
        
        // サイクル検出を無視し、単純な計算を再実行し、メモ化する（より安全）
        let current_steps = 0;
        let current_val = n;
        const path_for_memo = [];

        while (current_val !== 1) {
            if (memo_map.has(current_val)) {
                current_steps += memo_map.get(current_val);
                break;
            }
            
            if (path_for_memo.includes(current_val)) {
                // サイクル検出。この経路での計算は終了。
                break;
            }
            
            path_for_memo.push(current_val);

            if (current_val % 2 === 0) {
                current_val /= 2;
            } else {
                current_val = 3 * current_val + 1;
            }
            current_steps++;
        }
        
        // サイクル検出が成功しなかった場合、直接計算した結果をメモ化
        if (current_val === 1 || !path_for_memo.includes(current_val)) {
             memo_map.set(n, current_steps);
        }
        
        total_sum += current_steps;
    }

    console.log(`total=${total_sum}`);
});
