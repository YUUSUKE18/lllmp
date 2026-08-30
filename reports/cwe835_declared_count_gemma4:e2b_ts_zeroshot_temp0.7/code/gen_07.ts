import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目から読み取った個数（今回は無視し、実際に読み取れた数で処理する）
    // const expectedCount = parseInt(input[0].trim(), 10);

    let actualNumbers: number[] = [];
    let sum: bigint = 0n;

    // 2行目以降を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') {
            continue; // 空行は無視
        }

        const num = Number(line);

        // 整数として解釈でき、64bit整数に収まるか確認
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            actualNumbers.push(num);
            sum += BigInt(num);
        }
    }

    const count = actualNumbers.length;
    const totalSum = sum;

    // 結果を出力
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
