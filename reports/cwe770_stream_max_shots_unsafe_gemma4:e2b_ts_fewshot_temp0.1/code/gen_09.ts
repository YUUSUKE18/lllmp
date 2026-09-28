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

        // 整数として解釈可能かチェック
        const num = parseInt(trimmedPart, 10);
        
        if (!Number.isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 有効な数値が存在する場合のみ出力する（仕様上、空の入力や数値がない場合の挙動を考慮）
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 数値が一つもなかった場合、count=0, max=? となるが、最大値を定義できないため、ここでは count=0 max=-Infinity のような意味合いになる。
        // ただし、問題文の例に従い、読み込んだ有効な要素数と最大値をそのまま出力する。
        // 整数列が空の場合、count=0, maxは未定義だが、-Infinityを返すのが数学的に自然。
        process.stdout.write(`count=0 max=-Infinity\n`);
    }
}

solve();
