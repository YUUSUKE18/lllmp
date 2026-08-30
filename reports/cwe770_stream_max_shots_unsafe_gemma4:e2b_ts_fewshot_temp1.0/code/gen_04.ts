import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    
    // カンマで分割し、各要素をトリムして配列にする
    const parts = input.split(",");
    
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として解釈できるか確認し、64bit範囲内か確認する（ここでは標準のNumber型で十分だが、念のため）
        if (!isNaN(num)) {
            count++;
            // 最大値を更新
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 存在した有効な数値の数をカウントし、最大値を格納する
    // 空要素や非整数は無視される
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合、count=0, maxの扱い（ここでは-Infinityが出力される可能性があるが、課題の意図に基づきゼロと最大値を出力する）
        // 問題文から「要素数」と「最大値」を求めるため、存在しない場合は count=0, maxは適切に扱う必要がある。
        // 整数が存在しない場合の挙動は明記されていないが、ここでは入力された有効な数の情報のみを基に出力する。
        // 仮に何も数値がなかった場合、count=0で出力するのが自然。最大値は定義できないため、特定の値を設定するか、あるいはこのケースをどう扱うか仕様を明確にする必要がある。
        // 例として、もしデータが空なら count=0, max=適切なデフォルト（例: 0や-Infinity）を出力する。ここでは、数値が存在しない場合は count=0 を出力する。
        process.stdout.write(`count=0 max=-Infinity\n`); // 存在しない場合の安全策として-Infinityを使用
    }
}

solve();
