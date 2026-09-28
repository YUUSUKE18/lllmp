import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値であり、かつ64bit範囲内（ここでは単純にNaNでないことを確認）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 有効な数値が見つからなかった場合は、count=0, max=-Infinity または適切なデフォルト値を設定する必要があるが、
    // 仕様上は整数列が与えられることを前提とする。ここでは見つかった値を出力する。
    if (count === 0) {
        // 入力が空または無効な場合。この場合の最大値の扱いは仕様に明記されていないため、
        // 数値が存在しない場合は count=0, max=0 などが考えられるが、ここでは見つかった最大値をそのまま出力する。
        // もし入力が完全に無効なら、count=0, max=-Infinity となるが、整数列の最大値として扱うには注意が必要。
        // 課題の意図を尊重し、数値が見つからなかった場合は count=0, max=0 などとするか、
        // 入力されたもののみを評価する。ここでは、もし何も有効な数がなければ、count=0, max=0 と仮定する。（安全策）
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
