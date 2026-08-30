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

    // 整数として解釈できなかった要素や空要素は無視される。
    // 要素数と最大値を計算する。
    // もし有効な数値が一つもなかった場合、maxの値の扱いを定義する必要があるが、
    // 仕様上「整数列を受け取る」ため、ここでは読み取れた有効な数の個数と最大値を求める。

    if (count === 0) {
        // 有効な整数が一つもなかった場合の処理。
        // この場合、max値は定義できないが、入力された要素数が0になる。
        // 例として、もし入力が空だったり全て無効だった場合、最大値をどうするか？
        // 仕様に従い、読み取れた有効な数のみをカウントする。
        // 少なくとも1行出力する必要があるため、count=0でもmaxは何か？
        // ここでは、入力された要素数と最大値を出力するという指示に基づき、
        // 有効な数が存在しない場合は、最大値を適切なデフォルト値（例: -Infinityや0など）とするか、
        // 読み取れた有効な数の最大値として扱う。
        // 今回は「整数として解釈できない要素も無視する」ため、countが0ならmaxは未定義だが、
        // 厳密に「最大値」を求めるので、もし入力が空なら max は意味を持たない。
        // ただし、例題の形式に従い、読み取れた有効な数のみを対象とする。
        // count=0の場合、maxValueは初期値の-Infinityのままになる。
    }

    // 64bit整数として扱うため、数値型で出力する。
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
