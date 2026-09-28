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
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ64bitの範囲内であるかを確認（ここでは単純にNaNチェックと数値比較で対応）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める。
    // 仕様では「カンマ区切りの整数列を受け取る」とあるため、入力された全ての数値の数を数えるのではなく、
    // 有効な整数要素の数を数えるのが自然だが、「要素数」が何を指すか不明確。
    // 例1の形式に倣い、読み込んだ有効な整数の総数（count）と最大値（maxValue）を出力する。

    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合、0個と適切な最大値を出すか、あるいは仕様に厳密に従う。
        // ここでは、入力されたカンマ区切りの要素数（空白無視）ではなく、有効な整数の数をカウントする。
        process.stdout.write(`count=0 max=-Infinity\n`); // または 0 0 など、文脈によるが、-Infinityが安全
    }
}

solve();
