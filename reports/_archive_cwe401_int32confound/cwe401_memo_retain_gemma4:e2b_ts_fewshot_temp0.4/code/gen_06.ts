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
    // 1 に到達するまでの手数は 0
    total_count += 0;
    return;
  }

  if (memo.has(n)) {
    // メモ化された値を使用
    total_count += memo.get(n);
    return;
  }

  // 計算とメモ化
  if (n % 2 === 0) {
    // n が偶数なら n/2
    const next_n = n / 2;
    // 再帰的に計算（またはループで計算）
    const steps = 1 + (n % 2 === 0 ? (n / 2) : (3 * n + 1)); // 1ステップ + 次のステップ
    
    // ここでは、n から 1 に到達するまでの手数を求めるため、再帰的な構造を模倣します。
    // 実際には、n から 1 へのパスを計算する必要があります。
    // n が偶数なら n/2 に遷移。n が奇数なら 3n+1 に遷移。
    
    // 1 に到達するまでの手数を求めるため、再帰的な構造で考える。
    // f(n) = n が 1 になるまでの手数
    // f(n) = 1 + f(n/2) if n is even
    // f(n) = 1 + f(3n+1) if n is odd
    
    // 簡略化のため、ここでは再帰的な計算を直接行います。
    // ただし、メモ化を正しく行うためには、計算途中の値が1に収束する保証が必要です。
    
    // 簡略化された再帰計算（メモ化を適用）
    let steps_n;
    if (n % 2 === 0) {
      steps_n = 1 + memo.get(n / 2)!;
    } else {
      steps_n = 1 + memo.get(3 * n + 1)!;
    }
    
    // 実際には、再帰呼び出しで計算し、その結果をメモ化する必要があります。
    // 最初に n=1 のケースでベースケースを定義し、再帰的に計算します。
    
    // 再度、メモ化を正しく適用するために、計算ロジックを修正します。
    // 既存のループ処理を再構築します。
    
    // この問題は、各クエリ n について f(n) を計算し、その合計を求める問題です。
    // f(n) = (n=1なら0, n>1ならnが偶数ならf(n/2), nが奇数ならf(3n+1))
    
    // 既にメモ化されているか確認し、なければ計算します。
    
    // 処理を再実行（このブロック内での処理は、全体で一度だけ実行されるべきです）
    
    // 既存のロジックを、再帰的なメモ化計算に置き換えます。
    // 最初のループ処理は、入力の読み込みと合計計算に特化させます。
    
    // 処理を中断し、再構築します。
    
  }
});

// 最終的な処理を再構築します。
// 読み込みが完了した後の処理を記述します。
// 標準入力全体を一度に読み込む方が、再帰的なメモ化計算には適しています。

let input = '';
process.stdin.on('data', (data) => {
    input += data.toString();
});

process.stdin.on('end', () => {
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let final_total = 0;
    const calculated_memo = new Map<number, number>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (Number.isNaN(n)) continue;

        if (n === 1) {
            // n=1 の場合の手数は 0
            final_total += 0;
            continue;
        }

        // メモ化された値があるか確認
        if (calculated_memo.has(n)) {
            final_total += calculated_memo.get(n)!;
            continue;
        }

        // 再帰的計算とメモ化
        let current_n = n;
        let steps = 0;
        const path: number[] = []; // 経路を記録して、計算を効率化する（ここでは直接計算）

        while (current_n !== 1) {
            if (calculated_memo.has(current_n)) {
                // 既に計算済みの値があれば、その結果を足し合わせる
                steps += calculated_memo.get(current_n)!;
                break;
            }

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            path.push(current_n);
        }
        
        // ループが終了した時点で、1に到達するまでの手数を計算し、メモ化する
        // この問題は、各 n について f(n) を計算し、その合計を求めるので、
        // 1 から n への遷移の「回数」を求める必要があります。
        // 課題の記述：「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
        // これは、n から 1 へのパスの長さです。
        
        // 再度、f(n) = 1 + f(next) の形で計算します。
        
        let steps_n_calc = 0;
        let temp_n = n;
        const history: number[] = []; // 計算過程を記録

        while (temp_n !== 1) {
            if (calculated_memo.has(temp_n)) {
                // 既に計算済みの値があれば、その結果を足し合わせる
                steps_n_calc += calculated_memo.get(temp_n)!;
                break;
            }

            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            history.push(temp_n);
        }
        
        // 1 に到達するまでの手数は、現在の計算パスの長さ + 既に計算済みの部分の合計
        // 実際には、n から 1 へのパスの長さは、このwhileループのイテレーション回数になります。
        
        // 簡略化のため、再帰的なメモ化を再適用します。
        
        const calculate_f = (num: number): number => {
            if (num === 1) return 0;
            if (calculated_memo.has(num)) return calculated_memo.get(num)!;

            let result: number;
            if (num % 2 === 0) {
                result = 1 + calculate_f(num / 2);
            } else {
                result = 1 + calculate_f(3 * num + 1);
            }
            
            calculated_memo.set(num, result);
            return result;
        };
        
        const steps_n_final = calculate_f(n);
        final_total += steps_n_final;
    }

    console.log(`total=${final_total}`);
});
