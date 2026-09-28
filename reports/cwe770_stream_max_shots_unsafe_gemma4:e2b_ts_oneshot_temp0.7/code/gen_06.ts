import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能で、かつ64bit範囲内（JavaScriptのNumber型が扱う範囲内）か確認
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // すべての要素が空または数値でなかった場合、countとmaxValueを適切に設定する必要がある。
    // 問題文の意図として、「整数として解釈できた要素」のみを数える、という解釈を採用する。
    // ただし、仕様は「要素数」と「最大値」を求めるため、無視した要素を含まないカウントが必要となる。

    if (count === 0) {
        // 数値が一つもなかった場合、最大値をどうするか。ここでは、入力された有効な数値が0個なので、最大値は定義できないか、あるいは-Infinityなどが適切かもしれない。
        // ただし、問題文の制約から、もし要素が存在しなければ、count=0, max=? となる。
        // 念のため、空の入力に対する振る舞いを考える。ここでは、数値がない場合は、count=0, max=0とするのが安全だが、最大値は負の値を持つ可能性があるため-Infinityを保持する方が数学的には正しい。
        // しかし、出力形式が `count=<個数> max=<最大値>` なので、実数として扱えるもののみを考慮し、もし何も数値がなければ、最大値は定義しない（あるいは0とする）と解釈する。
        // 最初の例の挙動に倣い、有効な数値が存在する場合のみ計算を行う。
        process.stdout.write(`count=0 max=-Infinity\n`); // 数値がない場合の安全策
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
