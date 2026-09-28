/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        return;
    }

    // 1行目から実際に読み取れた個数を取得
    const countLine = input[0].trim();
    if (!countLine) {
        // 1行目が空の場合は処理を終了
        return;
    }
    const actualCount = parseInt(countLine, 10);

    if (isNaN(actualCount)) {
        // 1行目が整数でない場合は無視（仕様上は読み取れた個数として扱わないが、念のため）
        return;
    }

    let sum: bigint = 0n;
    let actualReadCount = 0;

    // 2行目以降の整数を読み込む
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);
        
        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数として扱うためBigIntに変換して合計する
            sum += BigInt(num);
            actualReadCount++;
        }
    }

    // 実際に読み取れた個数 (actualReadCount) と合計 (sum) を出力する
    console.log(`count=${actualReadCount} sum=${sum.toString()}`);
}

solve();
