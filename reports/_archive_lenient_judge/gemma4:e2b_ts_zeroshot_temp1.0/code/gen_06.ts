import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈可能かチェック
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数に変換を試みる
        const num = parseInt(trimmedPart, 10);
        
        // isNaNチェックと、元の文字列が純粋な整数表現であったか（つまり、非数値文字が含まれていなかったか）を確認する。
        // 仕様では「整数として解釈できない要素も無視する」とあるため、`parseInt`の結果が有効で、かつ元の入力が意図した通り整数であれば採用する。
        // ただし、厳密に「整数として解釈できない要素も無視する」ためには、文字列全体をチェックする必要がある。
        // ここでは、`Number()`や`isNaN`を使った後、再度文字列として検証することで、浮動小数点や非数値文字が混入していないかを確認する。
        if (!isNaN(num) && String(num) === trimmedPart) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を取得
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum: bigint = 0n; // 合計は64bit整数の範囲に収まるため、安全のためBigIntを使用する（JavaScriptの標準Numberは53bit精度）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
