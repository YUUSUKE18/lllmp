import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.trim().split(',');

    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 空文字列や空白のみの要素は無視
        if (part.length === 0) continue;

        const num = parseInt(part.trim(), 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではparseIntの結果に依存するが、一般的な数値として扱う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様では「カンマ区切りの整数列を受け取る」とあるため、全ての要素を数えるのではなく、有効な整数のみを対象とする。
    // ただし、「要素数」は入力されたカンマ区切りの要素の総数か、それとも有効な整数の数か？
    // 例として、"1,2,3" -> count=3, max=3 と解釈する（入力された要素数をカウント）

    // 再度、仕様を厳密に解釈し直す: 「要素数」と「最大値」を求める。
    // 入力されたカンマ区切りの整数列を受け取る。
    // これは、カンマで区切られた全ての数値の個数と、その中の最大値を求めることを意味すると考えるのが自然。

    let finalCount = 0;
    let finalMax = -Infinity;

    for (const part of parts) {
        if (part.length === 0) continue;
        const num = parseInt(part.trim(), 10);
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
