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
    let sum: number = 0;
    let lineNumber = 1;

    // 2行目以降を読み取り、整数として処理する
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }
        
        const num = parseInt(line, 10);
        
        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（問題の制約上、通常は問題の範囲内と仮定するが、念のため）
            // JavaScriptのNumberはIEEE 754倍精度であり、安全に64bit整数（2^53-1）を扱える。
            // 64bit整数（-2^63から2^63-1）の範囲内であるかを確認する。
            if (num >= -(2**63) && num <= (2**63 - 1)) {
                actualNumbers.push(num);
                sum += num;
            }
        }
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${actualNumbers.length} sum=${sum}`);
}

solve();
