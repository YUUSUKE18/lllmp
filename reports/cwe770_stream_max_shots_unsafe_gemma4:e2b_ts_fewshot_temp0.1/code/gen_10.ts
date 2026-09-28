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

    // 有効な数値が存在する場合のみ出力する（仕様上、空要素や非整数を無視するため、カウントと最大値は有効な数のみを対象とする）
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 数値が一つもなかった場合の処理（ここでは count=0, max=適切な値、または仕様に厳密に従う。最大値の定義がないため、ここでは 0 または -Infinity を考慮するが、例示された形式に従い、数値が存在しない場合は count=0 で出力するのが自然）
        // ただし、問題文は「要素数と最大値を求めます」とあるため、入力に有効な整数が一つもなかった場合、count=0, max=? となる。
        // 厳密には、値がない場合の最大値の定義が必要だが、ここでは count=0 で出力する。
        process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値
    }
}

solve();
