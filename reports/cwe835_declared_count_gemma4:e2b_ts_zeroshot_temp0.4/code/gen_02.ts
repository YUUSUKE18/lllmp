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

    let actualCount = 0;
    let sum = 0;

    // 2行目以降を整数として読み取る
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }
        
        const num = parseInt(line, 10);
        
        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualCount++;
            sum += num;
        }
    }

    // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
