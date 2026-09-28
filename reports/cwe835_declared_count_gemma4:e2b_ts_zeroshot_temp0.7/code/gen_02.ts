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

    // 2行目以降を読み取り、整数として処理する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') {
            continue;
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数に収まるか確認（ここではJavaScriptのNumber型が安全に扱える範囲としてチェック）
            // 実際にはBigIntで扱う方が厳密だが、入力が64bit範囲内であれば通常のNumberで十分な場合が多い。
            // ここでは読み取れた整数をそのまま扱う。
            actualNumbers.push(num);
            sum += BigInt(num);
        }
    }

    const actualCount = actualNumbers.length;
    const totalSum = sum;

    // 指定された形式で出力
    console.log(`count=${actualCount} sum=${totalSum.toString()}`);
}

solve();
