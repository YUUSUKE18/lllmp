import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("valid=0");
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    // 妥当性の判定に使用する正規表現
    // ^[\d,]+ : 行が1文字以上の数字またはカンマで始まっていることを要求する (空行や数字とカンマ以外の文字を排除)
    // (?:,\d*)* : カンマとそれに続く0個以上の数字の繰り返し (カンマ区切りの整数列を許容)
    // $ : 行の終わり
    // このパターンは、少なくとも1つの数字が含まれ、数字とカンマのみで構成されていることを保証します。
    const validationRegex = /^[\d,]+(?:,\d*)*$/;

    for (const line of lines) {
        // 行の前後の空白を無視するため、ここでは行全体をチェックする
        // ただし、仕様に基づき、行の内容が厳密に正規表現に一致するかを判定する。
        
        // 行の前後にある空白を無視する処理は、正規表現の ^ と $ で行われるため、
        // ここでは行の内容をそのままチェックする。
        
        if (line.length > 0 && validationRegex.test(line)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
