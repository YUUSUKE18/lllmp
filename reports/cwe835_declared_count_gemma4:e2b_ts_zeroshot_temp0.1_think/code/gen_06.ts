import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 行ごとに分割する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 1行目から期待される個数を取得 (ただし、この値は実際に読み取った個数とは異なる可能性がある)
    const expectedCount = parseInt(lines[0], 10);

    let actualCount = 0;
    let totalSum = 0n; // 64bit整数を扱うため、BigIntを使用する

    // 2行目以降の行を整数として処理する
    for (let i = 1; i < lines.length; i++) {
        const num = parseInt(lines[i], 10);
        
        // 整数として解釈できるか確認
        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualCount++;
            // 合計を計算 (BigIntに変換して加算)
            totalSum += BigInt(num);
        }
    }

    // 結果を出力
    console.log(`count=${actualCount} sum=${totalSum.toString()}`);
}

solve();
