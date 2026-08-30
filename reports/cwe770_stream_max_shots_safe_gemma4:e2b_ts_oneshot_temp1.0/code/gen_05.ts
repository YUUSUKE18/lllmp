import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合は最大値を定義する必要がありますが、ここでは実質的な制約がないため-Infinityとします。
        return;
    }

    // カンマで分割し、空白を除去して整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }
        // 整数として解釈できるかチェック（非数字文字が含まれていないか）
        if (/^-?\d+$/.test(trimmedPart)) {
            const num = parseInt(trimmedPart, 10);

            // 値が64bit範囲に収まるか確認（ここでは標準のJavaScript Numberで十分だが、厳密性を保つためチェック）
            // ここでは問題文の指示に基づき、読み込んだ整数をそのまま扱う。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が更新されなかった場合（入力がすべて無効な場合）、初期値-Infinityを保持する
    if (count === 0) {
        // 空の整数列の場合、最大値は定義できません。ここでは便宜的に0とするか、仕様に依存しますが、通常は-Infinityまたはエラー処理が必要です。
        // ここでは、もし数字が一つもなかった場合は count=0 となるため、max=-Infinity が最も安全です。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
