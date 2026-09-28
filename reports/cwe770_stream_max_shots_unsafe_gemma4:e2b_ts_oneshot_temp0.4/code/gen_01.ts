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

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、かつ64bitの範囲内（ここでは安全のため一般的な数値チェック）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントと最大値に含める必要があるか、
    // 仕様を再確認すると「カンマ区切りの整数列を受け取る」ため、入力されたすべての要素を考慮しつつ、
    // 整数として有効なもののみを数えるのが自然。
    // 例: "1,2,a,3" -> 数値は 1, 2, 3 の3つと考えるべきか？
    // 「それらの『要素数』と『最大値』を求めます」という指示に基づき、入力された文字列の構造ではなく、
    // 有効な整数のみを対象とします。

    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値は定義できないか？
        // 仕様に「要素数」と「最大値」を求めるため、有効な数が0個の場合は count=0, max=? となる。
        // ここでは、入力されたカンマ区切りの要素の数をカウントするのではなく、整数として有効な要素の数をカウントします。
        // もし何も数値がなかった場合、最大値をどうするか？ 0 または -Infinity が考えられるが、
        // 入力された整数列から最大値を求めるため、空の場合は特別な値が必要。
        // 一般的に、空集合の最大値は未定義だが、ここでは入力された有効な数のみを対象とする。
        // もし何も数値がなかった場合、count=0, max=0 とするのが安全かもしれないが、今回は「整数として解釈できない要素も無視する」という指示に従い、カウントされたものだけを扱う。
        // ゼロ個の場合、最大値はここでは定義しない（あるいは入力がないため出力しない）と考えるのが妥当だが、
        // 出力形式に合わせるため、もし有効な数が0個なら max は意味を持たない。
        // ここでは、少なくとも1つ以上の数値が入力された場合にのみ count と max を出力すると仮定する。
    }

    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合、仕様に厳密に従うため何を出力するか不明確だが、
        // 入力が空または無効な場合、 count=0, max=? となる。
        // 念のため、もし入力されたカンマ区切りの要素の数を数えるなら parts.length を使うべきか？
        // 「整数列を受け取る」ため、ここでは有効な整数の数と最大値を出す。
        // 数値が一つもなかった場合は、 count=0, max=0 とするのが最も安全かもしれない。
        process.stdout.write(`count=0 max=0\n`);
    }
}

solve();
