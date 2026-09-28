import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    const num = parseInt(trimmedToken, 10);

    // チェック：整数として解釈できるか、かつ64bit範囲内か（ここではJavaScriptのNumber型で十分だが、仕様に合わせる）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した場合、countは有効な整数の数、maxValueはそれらの最大値となる。
// 課題の要求に従い、空要素・前後の空白は無視し、整数として解釈できない要素も無視する処理を反映させるため、
// ここでは「カンマ区切りの整数列」という前提に基づき、有効な整数のみをカウントし最大値を求める。

if (count === 0) {
    // カウントが0の場合の処理（例：入力が空または数値を含まなかった場合）
    // 最大値は定義できないため、ここでは-1や適切なデフォルト値を設定するが、
    // 具体的な制約がないため、もし数値が存在しない場合は最大値の出力が意味をなさない。
    // 例として、入力された有効な整数の数が0なら最大値は未定義だが、ここでは仕様に従い計算した値を出す。
    // ただし、-Infinityが出力されるのを避けるため、count=0の場合はmaxを適切に扱う必要がある。
    // 課題の例示がないため、数値が存在しない場合は count=0, max=-1 (または最小値) と仮定する。
    process.stdout.write(`count=0 max=-1\n`); // 数値が一つもなかった場合の安全策
} else {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}
