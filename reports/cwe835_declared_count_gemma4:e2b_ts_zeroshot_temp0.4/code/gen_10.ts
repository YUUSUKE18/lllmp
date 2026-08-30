/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        // 入力が空の場合は何も出力しない
        return;
    }

    // 1行目から実際に読み取れた整数の個数を取得
    const countLine = input[0].trim();
    if (!countLine) {
        // 1行目が空の場合は処理終了
        return;
    }
    const actualCount = parseInt(countLine, 10);

    let sum = 0;
    let actualReadCount = 0;

    // 2行目以降の行を整数として処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            // 空行は無視
            continue;
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 実際に読み取れた整数のみを対象とする
            sum += num;
            actualReadCount++;
        }
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${actualReadCount} sum=${sum}`);
}

solve();
