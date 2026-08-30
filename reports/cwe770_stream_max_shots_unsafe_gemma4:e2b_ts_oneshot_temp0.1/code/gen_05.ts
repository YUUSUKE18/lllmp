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

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではparseIntの範囲に依存するが、問題の制約に従う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素や空要素は無視される。
    // 空の入力があった場合、count=0, maxValue=-Infinityとなるが、ここでは少なくとも1行出力する。
    if (!hasValidNumber) {
        // 有効な整数が一つもなかった場合の処理（例：count=0, max=0 または count=0, max=エラー値など）
        // 仕様上は「要素数」と「最大値」を求めるため、有効な数がなければ count=0, max=適切な初期値とする。
        // 整数列が空の場合、最大値の定義が曖昧だが、ここでは入力された数値のみを考慮する。
        // もし入力が完全に無効な場合、count=0, max=0と仮定するのが安全かもしれないが、
        // ここでは読み取った有効な数に基づいて計算した結果を出力する。
        // 少なくとも1行出力する必要があるため、もし何も見つからなかった場合は count=0, max=0 とする。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
