import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した場合、countは有効な整数の数、maxValueはそれらの最大値となる。
// 課題の要求に従い、空要素・前後の空白は無視し、整数として解釈できない要素も無視する処理は上記で実施済み。
// ただし、「要素数」と「最大値」を求める際に、入力されたカンマ区切りの要素数をそのままカウントするか、有効な整数のみをカウントするかで解釈が分かれる。
// 例1, 2, 3の例では、空でない語や整数として解釈できるもののみを考慮しているため、ここでは有効な整数のみを数える。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合（例: 入力が空または非数値のみの場合）
    // この場合の出力形式の厳密な定義がないため、ここでは count=0, max=-Infinity とするのが数学的に自然だが、
    // 課題の意図を汲み取り「要素数」と「最大値」が意味を持つ場合にのみ出力する。
    // ただし、例1,2,3では入力があれば必ず出力される構造なので、ここではcount=0, max=0などとしておく。
    // 最も安全なのは、有効なデータが存在しない場合は何も出力しないか、あるいは count=0 max=0 とするが、
    // 厳密に「要素数」と「最大値」を求めるため、入力されたカンマ区切りの要素数をそのままカウントする方が意図に近いかもしれない。

    // 再度仕様を確認: 「空要素・前後の空白は無視し、整数として解釈できない要素も無視します。」
    // これは、countとmaxの対象となる要素が「有効な整数」に限られることを示唆している。
    // したがって、上記で計算した count と maxValue を出力する。もし count=0 なら max は定義されないため、
    // 便宜上、入力が空だった場合は何も出力しない（または count=0 max=0 とする）。
    // 例1,2,3の構造から、データが存在すれば必ず出力されると仮定し、count > 0 の場合のみ出力する。
}
