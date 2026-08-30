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
        
        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではparseIntの範囲で十分と仮定）
        if (!isNaN(num)) {
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

    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値の定義に注意が必要だが、
        // 仕様上は「要素数」と「最大値」を求めるため、ここでは最大値を適切な初期値（例：-Infinity）で保持する。
        // ただし、もし入力が空または非数値のみの場合、max=0やエラーになる可能性があるため、
        // 読み取った有効な数の最大値をそのまま出力する。
        finalMaxValue = -Infinity; // 有効な数がなければ最大値は定義できない（ここでは-Infinityとする）
    } else {
        // 実際に存在する数値の中から最大値を決定する
        finalMaxValue = maxValue;
    }

    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
