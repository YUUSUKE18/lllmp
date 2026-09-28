/**
 * 標準入力から整数を読み込み、その個数と合計を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 1行目から読み取る
    const firstLine = input[0].trim();
    if (!firstLine) {
        console.log("count=0 sum=0");
        return;
    }
    
    const count = parseInt(firstLine, 10);
    if (isNaN(count)) {
        // 1行目が数値でない場合は、読み取れた整数がないと見なす
        console.log("count=0 sum=0");
        return;
    }

    let sum = 0;
    let actualReadCount = 0;

    // 2行目以降を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェックし、かつ、実際に読み取れた個数に制限を設ける
        if (!isNaN(num)) {
            // 仕様に基づき、実際に読み取れた整数だけを対象とする。
            // ここでは、1行目の count が実際に読み取れた個数ではない可能性があるため、
            // 読み取れた数だけを合計する。
            sum += num;
            actualReadCount++;
        }
    }

    // 実際に読み取れた整数（空行や非数値行を除いたもの）の個数と合計を出力する
    console.log(`count=${actualReadCount} sum=${sum}`);
}

solve();
