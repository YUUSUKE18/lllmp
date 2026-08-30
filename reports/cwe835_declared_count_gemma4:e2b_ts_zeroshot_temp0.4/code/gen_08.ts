/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        // 入力が空の場合は何も出力しない
        return;
    }

    // 1行目から実際に読み取れた個数を取得
    const countLine = input[0].trim();
    if (!countLine) {
        // 1行目が空の場合は処理終了
        return;
    }
    const expectedCount = parseInt(countLine, 10);

    let actualCount = 0;
    let sum = 0;

    // 2行目以降の行を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェックし、64bit範囲内かチェック
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            // 実際に読み取れた整数のみを対象とする
            actualCount++;
            sum += num;
        }
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
