/**
 * 標準入力から整数の個数とそれに続く整数を読み込み、
 * 読み取れた整数の個数と合計を出力する。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        return;
    }

    // 1行目: 期待される整数の個数 (今回は読み取った個数との比較には直接使わないが、仕様に従い読み込む)
    const expectedCount = parseInt(input[0].trim(), 10);

    let actualCount = 0;
    let sum = 0;

    // 2行目以降を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈可能か確認 (数値のみで構成されているか、または整数値として解釈できるか)
        // ここでは、行全体が有効な整数のみで構成されていると仮定し、parseIntの結果が有効な数値であるかを確認する
        // 厳密には、行全体が整数のみで構成されているか、または整数が単独で存在するかを判定する必要があるが、
        // 「整数として解釈できない行も無視します」という指示に従い、純粋な整数のみを対象とする。
        
        // ただし、入力形式が「1行に1個ずつ」であり、行の内容が整数であると仮定する。
        // parseIntがNaNを返さないことを確認する。
        if (!isNaN(num)) {
            // 念のため、読み取った値が64bit整数範囲内であることを確認（仕様上、読み取れる値は範囲内とあるが、念のため）
            if (Number.isSafeInteger(num)) {
                actualCount++;
                sum += num;
            }
        }
    }

    // 指定された形式で出力
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
