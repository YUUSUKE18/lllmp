import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // 行ごとに分割する
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        // データがない場合は終了
        return;
    }

    // 1行目から期待される個数を取得 (ただし、実際に読み取れた個数とは異なる可能性がある)
    const expectedCount = parseInt(lines[0], 10);

    let actualCount = 0;
    let sum = 0n; // 合計は64bit以上の可能性があるため BigInt を使用

    // 2行目以降のデータを処理する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualCount++;
            // 合計を計算 (BigIntとして加算)
            sum += BigInt(num);
        }
        // 空行や整数として解釈できない行は無視される
    }

    // 結果を出力
    console.log(`count=${actualCount} sum=${sum.toString()}`);
}

solve();
