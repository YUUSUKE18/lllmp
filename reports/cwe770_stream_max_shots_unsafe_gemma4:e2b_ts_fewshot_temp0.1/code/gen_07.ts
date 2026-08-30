import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    // カンマで分割し、各要素をトリムして配列にする
    const parts = input.split(",");
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か（ここではNumber型で十分だが、念のため）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様では「空でない語の数」と「最大値」を求めるとあるため、上記ロジックでcountとmaxValueを計算する。
    // ただし、例1, 2の形式に合わせるため、ここでは「整数として解釈できた要素の数」と「その中の最大値」を求める。

    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 整数が一つもなかった場合（空または非数値のみの場合）、count=0, max=? とする。
        // 最大値の定義が曖昧だが、ここでは最大値が存在しない場合は適切な値を設定する必要がある。
        // 例として、入力が空だったり全て無効な値だった場合は count=0, max=-Infinity としても良いが、
        // 整数列の最大値という文脈から、有効な数値が存在しない場合は特別な処理が必要かもしれない。
        // 今回は「整数として解釈できない要素も無視する」ため、countとmaxは実際にパースできた数に基づいて計算される。
        process.stdout.write(`count=0 max=-Infinity\n`); // 整数が一つもなかった場合のデフォルト
    }
}

solve();
