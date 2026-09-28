import * as fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();
if (!input) {
    process.stdout.write("count=0 max=0\n");
    process.exit(0);
}

const parts = input.split(',');
let count = 0;
let max = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // チェック：整数として解釈でき、64bit範囲内（ここでは安全のため一般的なチェック）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
        count++;
        if (num > max) {
            max = num;
        }
        hasValidNumber = true;
    }
}

// すべての要素が数値で構成されていた場合、最小値を初期化するために -Infinity を使用。
// もし有効な数値が一つもなかった場合は、count=0, max=0 (または適切なデフォルト値) とする。
if (!hasValidNumber && parts.length > 0) {
    // 数値が含まれていなかったが入力があった場合（例: ",," のようなケース）、
    // 仕様上は「整数として解釈できない要素も無視する」ため、カウントと最大値は0で初期化された状態を維持する。
    count = 0;
    max = 0; // または -Infinity をそのまま残すことも考えられるが、結果の出力形式に従い適切な数値を設定する
} else if (!hasValidNumber && parts.length === 0) {
     // 入力が空文字列の場合
     count = 0;
     max = 0;
}


process.stdout.write(`count=${count} max=${max}\n`);
