import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ64bit範囲内であるかを確認する（ここでは単純にNaNチェックと数値の比較で十分とする）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様に基づき、入力されたカンマ区切りの全ての数字を数えるのではなく、
    // 入力ストリーム全体から有効な整数を抽出してカウントする。
    // ただし、例の形式に従い、「カンマ区切り」の要素数をどう定義するかを明確にする必要がある。
    // ここでは「カンマで区切られた要素の総数」ではなく、「有効な整数の個数」を意味すると解釈し、
    // 読み込んだデータから抽出した有効な整数の個数と最大値を求める。

    // 再度、より厳密に仕様を解釈する: 「カンマ区切りの整数列を受け取る」
    // これは、入力が "1,2,3" のような形式であり、各要素が整数であることを意味する。
    // 読み込んだ文字列から有効な整数のみを取り出す処理を行う。

    const numbers = [];
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    count = numbers.length;

    if (count > 0) {
        let max = numbers[0];
        for (let i = 1; i < count; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        process.stdout.write(`count=${count} max=${max}\n`);
    } else {
        // 有効な整数が一つもなかった場合（空入力、または全て無効な値）
        // この場合の出力形式は仕様に明記されていないため、0個と最小値（またはエラーを示す値）を出力する。
        // 多くの競プロでは、要素がない場合は count=0 max=-Infinity や count=0 max=0 などが許容されるが、ここでは単にゼロを出力する。
        process.stdout.write(`count=0 max=0\n`);
    }
}

solve();
