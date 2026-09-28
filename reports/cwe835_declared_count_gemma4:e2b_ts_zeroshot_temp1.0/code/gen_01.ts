import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目から期待される個数を読み取るが、実際に読み取れた個数で処理する
    const expectedCount = parseInt(input[0].trim(), 10);
    let actualNumbers: number[] = [];
    let sum: bigint = 0n;
    let validNumbersRead = 0;

    // 2行目以降をチェック
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") continue;

        const num = parseInt(line, 10);
        
        // 整数として解釈できるか、かつ64bit整数範囲内かを確認
        if (!isNaN(num) && Number.isInteger(num) && num >= -(2**63) && num <= (2**63 - 1)) {
            actualNumbers.push(num);
            sum += BigInt(num);
            validNumbersRead++;
        }
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${validNumbersRead} sum=${sum.toString()}`);
}

solve();
