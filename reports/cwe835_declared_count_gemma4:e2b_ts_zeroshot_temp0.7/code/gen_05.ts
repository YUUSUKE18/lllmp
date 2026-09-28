import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    
    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目から読み取る。これは期待される個数だが、実際に読み取った個数と一致しないことがある。
    const expectedCountLine = input[0].trim();
    if (!expectedCountLine) {
        console.log('count=0 sum=0');
        return;
    }
    const expectedCount = parseInt(expectedCountLine, 10);

    let actualNumbers: number[] = [];
    let sum: bigint = 0n;
    let lineIndex = 1;

    // 2行目以降を読み取り、実際に存在する整数のみを対象とする
    while (lineIndex < input.length) {
        const line = input[lineIndex].trim();
        if (line === "") {
            lineIndex++;
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈でき、かつ64bitの範囲内であるかを確認
        if (!isNaN(num) && Number.isInteger(num) && num >= -(2**63) && num <= (2**63 - 1)) {
            actualNumbers.push(num);
            sum += BigInt(num);
        }
        
        lineIndex++;
    }

    const actualCount = actualNumbers.length;
    const actualSum = sum;

    // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
    console.log(`count=${actualCount} sum=${actualSum.toString()}`);
}

solve();
