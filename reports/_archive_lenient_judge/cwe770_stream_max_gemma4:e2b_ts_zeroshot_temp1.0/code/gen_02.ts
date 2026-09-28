/**
 * 標準入力からカンマ区切りの整数列を受け取り、要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0"); // 入力が空の場合は 0 要素、最大値 0 と見なす（仕様上は厳密には不明だが安全策）
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue; // 空の要素は無視
        }

        // 整数として解釈できるかチェック（数値に変換して整数判定）
        const num = Number(trimmedPart);
        
        if (!isNaN(num) && Number.isInteger(num)) {
            // 64bit整数の範囲内であるという仮定に基づき、処理を進める。
            // Node.jsのNumberはIEEE 754倍精度で十分64bit整数（2^53）を正確に扱えるが、
            // ここでは数値として扱う。もし厳密に2^63-1などの境界チェックが必要なら追加する。
            
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValidInput = true;
        }
    }

    // 最終結果を出力
    // countが0の場合、maxValueは-Infinityになるため、全ての要素が無視された場合はmax=0を返すのが自然だが、
    // 実際には入力から抽出できた最大値のみを反映させる。もし要素が存在しなければ max は定義されないか、あるいは文脈依存となる。
    // 仕様に「空要素・前後の空白は無視し、整数として解釈できない要素も無視」とあるため、
    // 有効な整数が一つもなかった場合（count=0）、最大値は未定義だが、ここでは安全のため 0 とする。
    
    const finalMaxValue = count === 0 ? 0 : maxValue;

    console.log(`count=${count} max=${finalMaxValue}`);
}

solve();
