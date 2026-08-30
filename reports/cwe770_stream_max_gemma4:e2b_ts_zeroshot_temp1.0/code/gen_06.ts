import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line + '\n';
    });

    rl.on('close', () => {
        try {
            // 標準入力全体を処理
            const data = input.trim();
            if (!data) {
                console.log("count=0 max=0");
                return;
            }

            // カンマで分割し、各要素を整数としてフィルタリング
            const numbers = data.split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0)
                .map(Number)
                .filter(n => Number.isInteger(n));

            if (numbers.length === 0) {
                // 有効な整数が一つもなかった場合
                console.log("count=0 max=0");
                return;
            }

            // 要素数と最大値を求める
            const count = numbers.length;
            // Math.maxの引数は配列全体を渡す
            const maxValue = Math.max(...numbers);

            // 結果を出力
            console.log(`count=${count} max=${maxValue}`);

        } catch (e) {
            // 数値変換やその他のエラーが発生した場合（仕様上は発生しにくいが安全のため）
            // この問題の制約に基づき、意図しない出力は避けるべきだが、もしエラーが出たら
            // デフォルト値を出すなど対処する。ここでは無視して終了とするか、空の結果とする。
        }
    });
}

solve();
