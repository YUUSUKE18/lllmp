import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    if (input.length === 0 || input[0].trim() === '') {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目から個数を取得（ただし、これは実際の個数ではない）
    const expectedCountLine = input[0].trim();
    if (!expectedCountLine) {
        console.log('count=0 sum=0');
        return;
    }
    const expectedCount = parseInt(expectedCountLine, 10);

    let actualNumbers: number[] = [];
    let totalSum: bigint = 0n;
    let lineIndex = 1;

    // 2行目以降を読み取り、整数として解釈できるものだけを収集
    while (lineIndex < input.length) {
        const line = input[lineIndex].trim();
        if (line === '') {
            lineIndex++;
            continue;
        }

        const num = parseInt(line, 10);
        
        // 整数として解釈できた場合のみ、実際のデータとして扱う
        if (!isNaN(num)) {
            // 64bit整数に収まることを前提とする
            actualNumbers.push(num);
            totalSum += BigInt(num);
        }
        lineIndex++;
    }

    const actualCount = actualNumbers.length;
    const sumString = totalSum.toString();

    // 指定された形式で出力
    console.log(`count=${actualCount} sum=${sumString}`);
}

solve();
