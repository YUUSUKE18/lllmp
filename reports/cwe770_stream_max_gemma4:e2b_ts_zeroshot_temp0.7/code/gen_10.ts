/**
 * 標準入力からカンマ区切りの整数列を受け取り、要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue; // 空の要素は無視
        }

        // 整数として解釈可能かチェックし、64bit範囲内かチェック
        // parseIntは文字列から整数を抽出する。isNaNで失敗を検出する。
        const num = Number(trimmedPart);

        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（JavaScriptのNumber型はIEEE 754倍精度であり、安全に64bit整数を扱う）
            // ここでは、問題の制約に従い、数値として扱える範囲であると仮定し、最大値を更新する。
            if (num >= -(2**53) && num <= (2**53 - 1)) { // 厳密な64bit整数範囲を考慮（ただしNode.jsの安全な整数表現に基づき実質的な上限）
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValidInput = true;
            }
        }
    }

    // 入力された要素が一つも有効でなかった場合（全て無視された場合）、0, 0を出力する。
    // 仕様上、入力があった場合は計算結果を出力する必要があるため、countとmaxValueは上記ループで決定される。
    if (count === 0) {
        // 入力が空または非数値のみだった場合、要素数0、最大値の定義は文脈依存だが、ここでは安全策として0, 0とする。
        // ただし、入力が「カンマ区切りの整数列」であるため、全て無視された場合は count=0, max=適切なデフォルト値となる。
        // 最大値を-Infinityから計算した結果をそのまま出力する。
        console.log(`count=${count} max=${maxValue === -Infinity ? 0 : maxValue}`);
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
