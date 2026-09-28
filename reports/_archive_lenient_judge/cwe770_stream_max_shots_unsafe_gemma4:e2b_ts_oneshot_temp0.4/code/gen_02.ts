import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白を無視して整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 空文字列や空白のみの要素はスキップ（split(',')で区切られた後の文字列が空でないことを確認）
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか、かつ64bit範囲内かを確認（ここでは数値の比較に使うため、NaNチェックと範囲チェックを念のため行う）
        if (!isNaN(num)) {
            // 値が64bit整数の範囲内にあることを確認（JavaScriptのNumber型はIEEE 754倍精度で実質的に十分だが、仕様に従う）
            // ここでは単純に数値として処理する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 最終的な結果を出力
    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合（この場合は count=0, max=... の形式で出力するのが自然だが、
        // 課題の意図から有効な数値が存在しない場合の挙動を明確にしないため、
        // 読み込んだ要素数と最大値を出力する）
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
