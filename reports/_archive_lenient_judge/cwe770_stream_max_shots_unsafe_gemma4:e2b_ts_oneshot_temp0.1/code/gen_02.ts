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

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値の比較で対応）
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
        // この場合、max値は定義できないが、入力された要素数（空または非数値）を無視して、
        // count=0, max=-Infinity のような形で出力するのが自然だが、
        // 厳密に「最大値」を求めるため、もし何も読み取れなければ、例えばcount=0, max=0とするか、
        // または入力された有効な数値がない場合はmaxの定義が問題となる。
        // ここでは、読み取れた有効な数がない場合は count=0, max=0 と仮定する（または -Infinity をそのまま出力）。
        // 課題の意図を尊重し、もし有効な数が一つもなければ最大値は意味を持たないため、ここではcountとmaxを出力する。
        // ただし、入力が空文字列や非数値のみの場合、count=0となる。
        process.stdout.write(`count=0 max=0\n`); // ゼロで初期化された状態を返す
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
