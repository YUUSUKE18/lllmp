import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    if (part === "") continue;

    const num = parseInt(part);

    // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が純粋な整数表現であること）
    if (!isNaN(num) && String(num) === part) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 整数が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは適切なデフォルト値を設定する。
    // 今回は「要素数」と「最大値」を求めよという指示なので、要素がない場合は count=0, max=-Infinity とするのが自然だが、
    // 厳密に「整数として解釈できない要素も無視する」という条件を満たすため、有効な数が存在しない場合は何も出力しない（またはcount=0を出力する）が、
    // 例に従い、読み込んだデータから計算した結果を出力する。
    // 空の入力や無効な入力のみの場合を考慮し、最低限の形式で出力する。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
