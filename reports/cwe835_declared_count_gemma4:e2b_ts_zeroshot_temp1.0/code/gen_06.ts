import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        // 入力が全くない場合
        console.log("count=0 sum=0");
        return;
    }

    // 1行目から個数を読み取る
    const countLine = lines[0];
    const expectedCount = parseInt(countLine, 10);

    let actualCount = 0;
    let sum = 0;

    // 2行目以降の整数を読み取り、検証する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const num = parseInt(line, 10);

        // 整数として解釈可能か確認
        if (!isNaN(num)) {
            // 読み取れた整数だけを対象とする
            actualCount++;
            sum += num;
        }
    }

    // 仕様に従い、実際に読み取れた個数と合計を出力する
    console.log(`count=${actualCount} sum=${sum}`);
}

solve();
