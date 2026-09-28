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

    // 最初の行から個数を取得する (これは無視されるが、入力の構造を理解するために存在する)
    // lines[0] は最初の整数として解釈される
    let expectedCount: number;
    try {
        expectedCount = parseInt(lines[0], 10);
    } catch (e) {
        // 最初の行が整数でなければ、処理を終了
        console.log("count=0 sum=0");
        return;
    }

    let actualCount = 0;
    let sum = 0n; // 合計は64bitを超える可能性があるためBigIntを使用

    // 2行目以降の行を整数として処理する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = parseInt(line, 10);

        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualCount++;
            sum += BigInt(num);
        }
    }

    // 最終結果を出力
    console.log(`count=${actualCount} sum=${sum.toString()}`);
}

solve();
