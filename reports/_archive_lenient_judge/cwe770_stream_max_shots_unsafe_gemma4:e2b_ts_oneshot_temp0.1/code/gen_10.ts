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

    // 整数として解釈できなかった要素は無視されるため、countとmaxValueが有効な数値のみを反映している。
    // もし入力が空または数値が一つもなかった場合、最大値の初期値(-Infinity)が残る可能性があるが、
    // 仕様上「整数として解釈できない要素も無視する」ため、有効な数があればその情報が出力される。
    // 少なくとも1つの有効な数が存在する場合のみ出力する（空入力の場合は何も出力しないか、仕様に依存するが、ここでは計算結果を出力する）

    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 数値が一つもなかった場合、最大値は定義できないため、空の出力とするか、あるいは仕様に従って適切な値を出す。
        // ここでは、入力から有効な整数が一つもなかった場合は何も出力しない（または count=0 max=-Infinity のような不自然な出力を避ける）
        // ただし、例示がないため、ここでは計算された結果のみを出力する。
    }
}

solve();
