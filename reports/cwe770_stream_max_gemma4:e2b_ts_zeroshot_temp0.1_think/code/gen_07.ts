function solve() {
    // 標準入力からデータを読み込む
    // process.stdin.readSync() を使用して、標準入力全体を同期的に読み込む
    const input = require('fs').readFileSync(0, 'utf8').trim();

    if (input === "") {
        // 入力が空の場合
        console.log("count=0 max=-Infinity");
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    let count = 0;
    // 最大値を初期化。負の無限大で初期化することで、最初の有効な数値が必ず最大値となるようにする。
    let max: number = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();

        // 空の要素は無視
        if (trimmedPart === "") {
            continue;
        }

        // 数値に変換を試みる
        const num = Number(trimmedPart);

        // 整数であり、NaNではないことを確認する
        if (!isNaN(num) && Number.isInteger(num)) {
            count++;
            if (num > max) {
                max = num;
            }
        }
        // 整数として解釈できない要素は無視される
    }

    // 結果を出力する
    // maxが-Infinityのままの場合（有効な整数が一つもなかった場合）、-Infinityを出力する。
    console.log(`count=${count} max=${max}`);
}

solve();
