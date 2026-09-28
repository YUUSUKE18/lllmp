import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let foundValidNumber = false;

for (const part of parts) {
    // 空文字列や空白のみの要素は無視
    if (part.length === 0) continue;
    
    const num = parseInt(part);

    // 整数として解釈できるか確認し、64bit範囲内か確認（ここではJSのNumber型で十分だが、厳密性を保つ）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        foundValidNumber = true;
    }
}

// 整数として解釈できた要素の数と最大値を計算
// ただし、入力がカンマ区切りであり、各要素が整数でなかった場合（例："1,a,3"）、
// 仕様に従い「整数として解釈できない要素も無視する」ため、countとmaxValueは上記ループの結果に基づき決定する。

// 空要素や非数値要素を完全に無視するため、再計算が必要になる場合があるが、
// 提示された例の意図（カンマ区切りの**整数列**）に従い、単純に存在する有効な数と最大値を求める。

// 再度処理を簡略化し、入力ストリーム全体を走査する方式で実装する場合:
let resultCount = 0;
let resultMax = -Infinity;

const actualParts = input.trim().split(',');

for (const part of actualParts) {
    if (part.length > 0) {
        const num = Number(part);
        // isNaNチェックはNumber()が失敗した場合に必要だが、ここでは数値として解釈できるかを確認
        if (!isNaN(num) && isFinite(num)) {
            resultCount++;
            if (num > resultMax) {
                resultMax = num;
            }
        }
    }
}

process.stdout.write(`count=${resultCount} max=${resultMax}\n`);
