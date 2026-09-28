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
    let lineIndex = 1;

    // 2行目以降を読み取り、整数としてパースする
    while (lineIndex < input.length) {
        const line = input[lineIndex].trim();
        if (line === "") {
            lineIndex++;
            continue;
        }

        const num = parseInt(line, 10);
        
        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数に収まるか確認（JavaScriptのNumber型はIEEE 754倍精度で安全だが、ここではBigIntで合計を扱うため、個々の値も安全に扱う）
            // 問題の制約上、読み取れた整数は64bit範囲内と仮定する。
            actualNumbers.push(num);
            sum += BigInt(num);
        }
        lineIndex++;
    }

    const actualCount = actualNumbers.length;
    const totalSum = sum;

    // 結果を出力
    console.log(`count=${actualCount} sum=${totalSum.toString()}`);
}

solve();
