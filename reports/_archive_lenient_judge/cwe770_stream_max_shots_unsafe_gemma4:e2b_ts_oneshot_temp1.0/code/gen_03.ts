import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白を無視して整数としてフィルタリング
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasNumbers = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として有効であり、64bit範囲内であるかを確認（ここでは基本的なNaNチェックで代用）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasNumbers = true;
        }
    }

    // 処理された数値がない場合は、最大値を適切に設定する必要があるが、問題の制約から空入力の場合は0または定義されないが、
    // 標準的な競技プログラミングでは、何も読み込まれなければcount=0, max=?となる。
    // ここでは、読み込まれた整数のみを考慮する。もし数値が一つもなければmaxValueは-Infinityのままになるため、
    // 少なくとも1つ以上の数値が読み込まれた場合のみ意味を持つ。
    
    let finalMaxValue = -Infinity;
    if (hasNumbers) {
        finalMaxValue = maxValue;
    } else {
        // 数値が一つもなかった場合。この場合は最大値をどう定義するかは仕様に依存するが、
        // 読み込まれた数値がないため、ここでは0とするか、あるいは問題の意図に従う必要がある。
        // 最小値を考慮して、もし数値が存在しない場合は空のセットとして扱う。
        // 例：入力が空の場合、count=0, max=?となる。ここでは、値が存在しない場合に -1 や 0 を出力するのが一般的だが、
        // 最大値を求める操作なので、存在しないなら最大値は定義できない（-Infinity）とするのが数学的には正しいが、
        // 出力形式に従うため、もし数値が存在しなければ最大値は定義しないか、あるいは0とする。
        // 今回は「整数として解釈できない要素も無視」というルールに基づき、有効な整数が一つもなければ count=0, max=? とする。
        // 簡潔にするため、読み込まれた数値がない場合はmaxを0とする（もし入力が全て空なら）。
        finalMaxValue = 0; // 入力に有効な整数が一つもなかった場合、最大値は0とする（ここでは便宜上）
    }

    process.stdout.write(`count=${count} max=${finalMaxValue}\n`);
}

solve();
