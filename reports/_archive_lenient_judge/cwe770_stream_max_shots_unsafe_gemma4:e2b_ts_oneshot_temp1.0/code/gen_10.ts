import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、空文字列を除去する
    const parts = input.split(',');

    let count = 0;
    let maxVal = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を無視して整数としてパースを試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素が一つもなかった場合は、カウントと最大値は0または適切なデフォルト値とする。
    // 仕様上、「要素数」と「最大値」を求めるため、有効な数値のみをカウント対象とする。
    if (!hasValidNumber) {
        // 数値が存在しない場合、count=0, max=-Infinity（あるいは問題の文脈に応じて0など）とする。
        // ここでは、入力された数値の個数と最大値を求めたいので、有効な数がなければ count=0, max=? とするが、
        // 通常は空入力の場合は 0 0 や 0 -Infinity などが考えられる。
        // 今回は「整数として解釈できない要素も無視する」という指示に従い、数値が存在しなければcount=0となる。
        // 最大値については、実質的な最大値が存在しないため、ここでは-1などを返すのが妥当だが、
        // 64bit整数の範囲を考慮し、入力された数値がない場合は count=0, max=0 とする。（最小の非負整数として）
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
