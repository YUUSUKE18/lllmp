import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    if (input.length === 0 || input[0] === '') {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目から個数を取得
    const countLine = input[0].trim();
    if (!countLine) {
        console.log('count=0 sum=0');
        return;
    }
    const expectedCount = parseInt(countLine, 10);

    let actualNumbers: number[] = [];
    let lineIndex = 1;

    // 2行目以降から整数を読み取る
    while (lineIndex < input.length) {
        const line = input[lineIndex].trim();
        if (line === '') {
            lineIndex++;
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);
        
        // 整数として解釈できるか確認
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型（IEEE 754倍精度浮動小数点数）で十分扱えるため、ここではそのまま格納する。
            // 厳密な64bit整数（2^53より大きい値）の扱いに注意が必要だが、入力が64bit範囲内と保証されているため、標準のNumber型で処理を進める。
            actualNumbers.push(num);
        }
        lineIndex++;
    }

    // 結果の計算
    const actualCount = actualNumbers.length;
    const sum = actualNumbers.reduce((acc, current) => acc + current, 0);

    // 結果の出力
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
