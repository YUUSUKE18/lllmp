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

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは単純にNaNチェックと数値の比較で対応）
        if (!isNaN(num)) {
            count++;
            hasValidNumber = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できなかった要素や空要素は無視される。
    // 少なくとも1つの有効な数値があった場合のみ結果を出力する（仕様上、入力が空の場合の挙動は明記されていないが、ここでは読み込んだ値に基づいて計算する）
    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合。この場合の出力形式の指定がないため、0個と最小値（または適切なデフォルト値）を出力する。
        // ただし、最大値が未定義の場合は -Infinity を使うのが数学的に正しいが、ここでは入力された数値のみを考慮し、もし何も読み込まれなければ count=0 max=0 などとするか、あるいは仕様に厳密に従う。
        // 読み込んだ有効な要素がない場合は、count=0, max=? となる。最大値の範囲が64bit整数なので、-1や0などで初期化する方が安全かもしれないが、ここでは読み込んだもののみを反映させる。
        // 入力が空または無効な場合、count=0, max=0 とする（最も安全なデフォルト）
        process.stdout.write(`count=0 max=0\n`);
    }
}

solve();
