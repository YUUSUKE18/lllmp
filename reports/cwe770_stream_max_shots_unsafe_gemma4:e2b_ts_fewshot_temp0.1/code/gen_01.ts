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
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様では「空でない語の数」と「最大値」を求めるとあるため、有効な整数のみを対象とする。
    
    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値は定義できないか、あるいは仕様に依存するが、ここでは安全のため0を出力する（または-Infinityなど）
        // ただし、入力が空文字列のみの場合、count=0となる。
        // 厳密には「要素数」と「最大値」を求めるため、有効な整数が存在しない場合はどう扱うか？
        // 例として、もし入力が "a,b" なら count=0, max=-Infinity となる。
        // ここでは、読み取れた有効な整数の数をカウントし、その最大値を出す。
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
