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
    // 空の入力があった場合、count=0, maxValue=-Infinityとなるが、問題の制約から正の整数が期待されるため、
    // 入力が完全に無効な場合は適切なデフォルト値（例: 0または-1）を考慮する必要があるが、ここでは読み取れた有効な数のみをカウントする。

    // 念のため、もし有効な数が一つもなかった場合、最大値をどうするか。
    // 仕様に基づき、読み取れた整数列から要素数と最大値を求める。
    if (count === 0) {
        // 有効な整数が一つもなかった場合、count=0, max=?。ここでは、入力された有効な数がゼロの場合を考慮し、
        // 最大値は定義できない（-Infinity）とするか、あるいは空のセットに対する最大値をどう扱うかを決定する必要がある。
        // 多くの競技プログラミングでは、データが存在しない場合は特別な値（例: -1や0）が求められることがある。
        // ここでは、読み取れた有効な数がゼロの場合、count=0, maxValue=0と仮定する（もし入力が空なら）。
        // ただし、-Infinityをそのまま出力するのは不適切かもしれないため、ここでは最大値が存在しない場合は0とする。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
