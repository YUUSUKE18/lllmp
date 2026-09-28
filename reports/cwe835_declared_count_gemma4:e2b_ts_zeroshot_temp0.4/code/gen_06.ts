/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        // 入力が空の場合は何も出力しない
        return;
    }

    // 1行目から実際に読み取れた個数を取得
    const countLine = input[0].trim();
    if (!countLine) {
        // 1行目が空の場合は処理を終了
        return;
    }
    const actualCount = parseInt(countLine, 10);

    let sum = 0;
    let actualReadCount = 0;

    // 2行目以降を整数として読み込む
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェックし、64bit範囲内かチェック
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            sum += num;
            actualReadCount++;
        }
    }

    // 仕様に従い、実際に読み取れた個数と合計を出力する
    console.log(`count=${actualReadCount} sum=${sum}`);
}

solve();
