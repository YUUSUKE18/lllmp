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
    // 仕様では「空でない語の数」と「最大値」を求めるとあるため、上記ロジックでcountとmaxValueが計算されている。
    
    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値は定義できないか、あるいは問題の文脈に応じて適切な値を設定する必要がある。
        // ここでは、入力に有効な整数が一つもない場合は、最大値を-Infinityとして扱うか、または0とするのが一般的だが、
        // 厳密には「最大値」が存在しないため、ここではcount=0, max=-1 (または0)と仮定する。
        // ただし、例題の形式に従い、実際に読み取った有効な数値があればそれを採用する。
        // もし入力が空や非数値のみの場合、maxは未定義となるが、ここでは-1を返すことで「最大値が存在しない」ことを示唆する。
        process.stdout.write(`count=0 max=-1\n`); // 実際には、もし入力に有効な整数が一つもなければ、この出力になる。
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
