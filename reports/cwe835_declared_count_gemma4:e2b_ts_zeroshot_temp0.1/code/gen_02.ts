import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目から個数を読み取る
    const countLine = input[0].trim();
    if (!countLine) {
        console.log('count=0 sum=0');
        return;
    }
    const expectedCount = parseInt(countLine, 10);

    let actualNumbers: number[] = [];
    let sum: bigint = 0n;
    let lineNumber = 1;

    // 2行目以降を読み取り、整数としてパースする
    while (lineNumber < input.length) {
        const line = input[lineNumber].trim();
        if (line === "") {
            lineNumber++;
            continue;
        }

        const num = parseInt(line, 10);
        
        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数に収まるかチェック（JavaScriptのNumber型はIEEE 754倍精度で安全だが、
            // 厳密に64bit整数として扱うため、ここでは数値として処理する）
            // 実際には、入力が64bit範囲内であるという前提で処理を進める。
            actualNumbers.push(num);
            sum += BigInt(num);
        }
        lineNumber++;
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${actualNumbers.length} sum=${sum.toString()}`);
}

solve();
