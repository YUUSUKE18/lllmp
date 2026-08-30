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
        // この場合、max値は定義できないが、入力された要素数が0になる。
        // 例として、もし入力が空文字列や非数値のみだった場合、count=0, maxValue=-Infinityとなる。
        // 課題の意図を汲み取り、有効な数が見つからなかった場合は最大値をどうするか？
        // 通常、このような問題では、データが存在しない場合は適切なデフォルト値（例: 0またはエラー）を返すか、
        // 入力された数値のみに基づいて計算する。ここでは読み取れた数値のみを対象とする。
        // もし入力が「1,a,2」なら count=2, max=2 となるべき。
        // count=0 の場合は、最大値は定義できないため、-1や0などとして扱うか、問題の制約に依存する。
        // ここでは、読み取れた数値のみを対象とするため、count=0の場合はmax値をどうするかを明確にする必要があるが、
        // 厳密な仕様がないため、もし有効な数が一つもなければ最大値は定義できないと考えるのが自然だが、
        // 例に従い、-Infinityをそのまま出力する。ただし、整数列の最大値として負の値が出ないことを期待する。
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
