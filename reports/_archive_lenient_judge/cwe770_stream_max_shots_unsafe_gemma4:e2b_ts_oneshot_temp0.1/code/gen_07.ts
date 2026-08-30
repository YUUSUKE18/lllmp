import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値の比較で対応）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素は無視されるため、countとmaxValueが正しく計算されているか確認する。
    // 仕様では「要素数」と「最大値」を求める。空要素や非整数は無視する。

    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合、count=0, max=? となるが、最大値の定義が曖昧になるため、
        // 読み込んだ有効な要素がない場合は count=0, max=-Infinity (または適切なデフォルト) とする。
        // ここでは、入力された数値のみをカウントし、最大値を求めるという指示に従う。
        // 有効な整数が存在しない場合、count=0, max=0 とするのが最も安全かもしれないが、
        // 読み込んだ要素数と最大値の計算結果を出力する。
        process.stdout.write(`count=0 max=-Infinity\n`); // または count=0 max=0 など、文脈によるが、ここでは有効な数値がない場合は -Infinity を保持する
    }
}

solve();
