import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムして整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか、かつ値が64bitの範囲内（ここでは標準的なJavaScriptのNumber型で十分だが念のため）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            validNumbersFound = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できなかった要素は無視され、有効な数のカウントと最大値が計算される。
    // 入力に何もない場合や、すべて無効な場合でも、countとmaxValueが出力される。
    if (validNumbersFound) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合の処理（空の入力や非数値のみの場合）
        // この場合、count=0, max=-Infinityとなるが、問題の制約から実質的に数がないことを示すため、
        // 読み取った要素数をそのままカウントする方がより安全かもしれない。
        // ただし、「整数として解釈できない要素も無視する」という指示に従うと、有効な数値の数だけを数えるべき。
        // ここでは、有効な数値が見つからなかった場合は count=0, max=-Infinity とするのが最も論理的である。
        process.stdout.write(`count=0 max=-Infinity\n`);
    }
}

solve();
