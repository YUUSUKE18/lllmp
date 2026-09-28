import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // 行ごとに分割し、空行を除去する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 1行目から期待される個数 N を取得
    const N = parseInt(lines[0], 10);
    
    let actualCount = 0;
    let sum = 0n; // 合計は64bitを超える可能性があるため BigInt を使用

    // 2行目以降のデータを処理する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 実際に読み取れた整数のみを対象とする
            actualCount++;
            // 合計を計算 (BigIntとして加算)
            sum += BigInt(num);
        }
    }

    // 結果を出力
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
