const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo: Map<number, number> = new Map();
let total_steps = 0;
let line_count = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);

    if (Number.isNaN(n)) {
        return; // 整数として解釈できない行は無視
    }

    if (n === 1) {
        // n=1 のときの手数は 0
        const steps = 0;
        // 処理を続ける前に、このクエリを処理する必要があるが、ここでは合計を計算するために処理を後回しにするか、
        // または即座に処理する。
        // 今回は、各クエリの結果を合計する必要があるため、再帰/動的計画法でステップ数を計算する関数を定義し、
        // その結果をメモ化する流れにする。

        // ここでは、各クエリに対して計算を実行する。
        // 最終的な合計を求めるために、memo化された値を参照して計算する。
        // ただし、問題の指示は「各クエリ n について...手数を求め、すべてのクエリの手数の合計を求めます」なので、
        // 入力がすべて読み終わるまで待つ必要がある。

        // 初期状態では、各クエリを処理する関数を呼び出す。
        // ここでは、入力ストリームが全て読み込まれるのを待つ。
    }

    // 各クエリに対して計算を実行する
    let current_n = n;
    let steps = 0;
    
    // Memoization check
    if (memo.has(current_n)) {
        steps = memo.get(current_n);
    } else {
        // Calculation
        let temp_n = current_n;
        let count = 0;
        while (temp_n !== 1) {
            if (temp_n === 1) break; // 安全策
            if (temp_n % 2 === 0) {
                temp_n = temp_n / 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
            count++;
        }
        steps = count;
        // Memoize the result
        memo.set(current_n, steps);
    }

    total_steps += steps;
    line_count++;
});

rl.on('close', () => {
    // すべての入力が読み終わった後、合計を出力する
    console.log(`total=${total_steps}`);
});
