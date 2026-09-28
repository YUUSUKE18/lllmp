import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // 行ごとに分割する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 1行目を期待される個数 N として読み込む (ただし、実際に読み取れた整数のみを対象とする)
    // 最初の行が整数であると仮定し、それをNとして扱う。
    // ただし、仕様上は「実際に読み取れた整数だけ」を対象とするため、
    // 最初の行を無視し、残りの行を整数として処理する方が安全。
    
    let actualCount = 0;
    let totalSum = 0n; // 合計は64bit整数に収まる可能性があるため、BigIntを使用

    // 2行目以降の行を整数として処理する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = Number(line);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数として扱うため、BigIntに変換して合計に加算する
            totalSum += BigInt(num);
            actualCount++;
        }
    }

    // 結果を出力
    console.log(`count=${actualCount} sum=${totalSum.toString()}`);
}

solve();
