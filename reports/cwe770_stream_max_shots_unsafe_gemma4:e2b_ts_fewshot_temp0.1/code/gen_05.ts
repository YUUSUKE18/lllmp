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
        
        // 整数として解釈可能かチェックし、64bit範囲内か（ここではNumber型で十分だが、念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    const finalCount = count;
    let finalMaxValue: number;

    if (finalCount === 0) {
        // 有効な整数が一つもなかった場合。仕様上は「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」ため、
        // カウントされた要素数と最大値を出力する。もし何も数値がなかった場合は、最大値をどうするか？
        // 例2の挙動を参考にすると、有効な数値が存在する場合のみカウントされるべきだが、ここでは「読み込んだカンマ区切りの整数列」から計算する。
        // 厳密には、有効な整数があった場合にのみcountとmaxを算出するのが自然。
        // ただし、例示された処理に従い、読み込んだ要素数（空でないもの）と最大値を出す。
        // 数値が一つもなかった場合は、count=0, max=?となる。ここでは-Infinityのまま出力する。
        finalMaxValue = -Infinity; 
    } else {
        finalMaxValue = maxValue;
    }

    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
