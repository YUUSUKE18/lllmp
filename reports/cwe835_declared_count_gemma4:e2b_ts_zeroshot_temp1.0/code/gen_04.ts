import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === "") {
        // 入力が空の場合は何もしない
        return;
    }

    // 1行目から個数を読み取る (ただし、この値は実際に読み取れた個数とは異なる可能性がある)
    const expectedCountLine = input[0].trim();
    if (expectedCountLine === "") {
        // 1行目が空の場合は処理終了
        return;
    }
    const expectedCount = parseInt(expectedCountLine, 10);

    let actualNumbers: number[] = [];
    let sum: bigint = 0n;
    let lineNumber = 1;

    // 2行目以降を読み取り、整数として解釈できるものだけを収集する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈でき、かつ64bit整数として妥当な値かを確認 (ここではparseIntが成功すれば64bitの範囲内と見なす)
        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualNumbers.push(num);
            sum += BigInt(num);
        }
    }

    // 実際に読み取れた個数と合計を出力する
    const actualCount = actualNumbers.length;
    const totalSum = sum;

    console.log(`count=${actualCount} sum=${totalSum.toString()}`);
}

solve();
