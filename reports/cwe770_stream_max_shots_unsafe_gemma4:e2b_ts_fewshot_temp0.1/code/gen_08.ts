import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    
    // カンマで分割し、各要素をトリムして配列にする
    const parts = input.split(",");
    
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として解釈可能かチェックし、64bit範囲内か（ここでは一般的なJSのNumber型で十分と仮定）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウント対象とするため、countは有効な数値の数になる。
    // ただし、仕様では「空でない語の数」と「最大値」を求めよ、とあるため、
    // ここで count は有効な整数の数、maxValue はその中の最大値となる。

    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合（空の入力や非数値のみの場合）
        // この場合の出力形式は明記されていないが、ここでは count=0 max=-Infinity のような値になる。
        // 厳密に「要素数」と「最大値」を求めるため、有効な要素がない場合は count=0, max=? となる。
        // 例として、入力が空または非数値のみの場合も処理する。
        process.stdout.write(`count=0 max=-Infinity\n`);
    }
}

solve();
