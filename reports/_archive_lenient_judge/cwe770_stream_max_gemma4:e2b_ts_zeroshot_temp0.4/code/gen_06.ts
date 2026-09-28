import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // 標準入力から読み込んだ文字列を改行で分割し、各要素を処理する
    const lines = input.trim().split('\n');

    let numbers: number[] = [];

    for (const line of lines) {
        // カンマ区切りの整数列として処理
        const parts = line.split(',');
        for (const part of parts) {
            if (part) {
                const num = parseInt(part.trim(), 10);
                // 整数として解釈でき、かつ64bitの範囲内（JavaScriptのNumber型で十分）かチェック
                if (!isNaN(num) && Number.isSafeInteger(num)) {
                    numbers.push(num);
                }
            }
        }
    }

    if (numbers.length === 0) {
        // 要素が一つもなかった場合（空入力など）
        console.log("count=0 max=0");
        return;
    }

    // 要素数を求める
    const count = numbers.length;

    // 最大値を求める
    // Math.maxの最初の引数に配列を渡すことで、すべての要素の中から最大値を求める
    const maxValue = numbers.reduce((max, current) => Math.max(max, current), numbers[0]);

    // 結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
