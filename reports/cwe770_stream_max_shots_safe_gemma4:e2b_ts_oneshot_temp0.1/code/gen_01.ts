import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/);

    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const line of lines) {
        // カンマ区切りの文字列を整数に変換しようと試みる
        const num = parseInt(line, 10);

        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 空要素や非数値要素は無視されるため、countとmaxValueが正しく計算されているか確認する。
    // 仕様では「カンマ区切りの整数列」を受け取るため、入力が空でない限り、
    // 読み取れた有効な整数の数と最大値を求める。

    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合（例: 入力が空または非数値のみの場合）
        // このケースの出力形式は仕様に厳密に従う必要がある。
        // 読み取れた要素数と最大値を出力する。もし何も読み取れなければ、count=0, max=-Infinityとなるが、
        // 整数列として解釈できない要素を無視するという指示に基づき、有効な数が0個なら count=0, max=? となる。
        // ここでは、入力から抽出できた有効な整数の数と最大値を報告する。
        process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値。ここでは読み取れたものが0個なら0を出力するのが自然かもしれないが、-Infinityも許容される。
    }
}

solve();
