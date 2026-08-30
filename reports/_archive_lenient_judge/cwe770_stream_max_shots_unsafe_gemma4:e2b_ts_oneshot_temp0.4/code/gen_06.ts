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
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内かチェック（ここではNumber型で十分だが、厳密性を保つ）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める。
    // 仕様では「要素数」と「最大値」を求めるとあるため、入力されたカンマ区切りの要素の総数を要素数とするか、
    // それとも有効な数値の数を要素数とするか、文脈から判断する。
    // 例1の形式に合わせ、入力された全ての要素（空白区切り）ではなく、カンマ区切りの要素を処理し、
    // 有効な整数のみをカウントするのが自然と解釈する。

    // 再度、仕様を厳密に解釈する: 「カンマ区切りの整数列を受け取ります。」
    // これは入力全体が「1,2,3」のような形式であることを示唆している。

    const numbers = input.split(',').map(s => s.trim()).filter(s => s.length > 0);

    let finalCount = 0;
    let finalMax = -Infinity;

    for (const s of numbers) {
        const num = parseInt(s, 10);
        if (!isNaN(num)) {
            finalCount++;
            if (num > finalMax) {
                finalMax = num;
            }
        }
    }

    process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
}

solve();
