import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    
    if (input.length === 0 || input[0] === '') {
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
    let sum: number = 0;
    let lineNumber = 1;

    // 2行目以降を読み取り、整数としてパースする
    while (lineNumber < input.length) {
        const line = input[lineNumber].trim();
        if (line === '') {
            lineNumber++;
            continue;
        }
        
        const num = parseInt(line, 10);
        
        // 整数として解釈できるかチェックし、64bitの範囲内かチェックする (念のため)
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            actualNumbers.push(num);
            sum += num;
        }
        
        lineNumber++;
    }

    // 実際に読み取れた個数と合計を出力する
    console.log(`count=${actualNumbers.length} sum=${sum}`);
}

solve();
