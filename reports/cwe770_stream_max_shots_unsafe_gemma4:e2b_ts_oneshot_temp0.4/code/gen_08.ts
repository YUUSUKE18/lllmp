import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白や空要素を無視して整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasNumbers = false;

    for (const part of parts) {
        // 空文字列や空白のみの要素をスキップ
        if (part.trim() === "") continue;

        const num = parseInt(part.trim(), 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではNumber型で十分）
        if (!isNaN(num)) {
            count++;
            hasNumbers = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 厳密に count=<個数> max=<最大値> を出力する
    if (hasNumbers) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 数値が一つもなかった場合の処理（仕様上は空の入力に対する振る舞いは明記されていないが、安全のため）
        // 0個, 最大値なし（または最小値）とする。ここでは最大値が存在しない場合は max=0 とするか、あるいは何も出力しないかだが、
        // 入力が空の場合は count=0 max=0 が妥当と判断する。
        process.stdout.write(`count=0 max=0\n`);
    }
}

solve();
