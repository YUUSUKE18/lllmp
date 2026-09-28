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

    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空の要素や非数値の要素は無視されるため、countが有効な整数のみを数える。
// 問題文の仕様「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」に従い、
// 実際に読み取ったカンマ区切りの値のうち、有効な整数のみをカウントする（ただし問題文の意図を再確認）。

// ここでは、「カンマで区切られたものすべて」を要素として扱い、それが有効な整数であればカウントするという解釈を採用する。
// 例: "1,2,a,3" -> 3つの要素が読み込まれるが、有効な整数は {1, 2, 3} であり、count=3, max=3となるべきか？
// または、「存在する整数のみを数える」という意味で、カウント対象の要素数を問うと解釈する。

// 仕様：「『要素数』と『最大値』を求めます。」
// 一般的に、入力されたデータセットから抽出された有効な数値の数を「要素数」と見なします。

let finalCount = 0;
let finalMaxValue = -Infinity;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
        finalCount++;
        if (num > finalMaxValue) {
            finalMaxValue = num;
        }
    }
}


process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
