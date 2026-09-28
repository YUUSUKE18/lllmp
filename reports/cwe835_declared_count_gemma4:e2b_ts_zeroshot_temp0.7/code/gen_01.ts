import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('count=0 sum=0');
        return;
    }

    // 1行目を読み取り、個数を取得（ただし、実際に読み取れた個数と一致しない可能性があるため、これは参照情報としてのみ使用）
    const expectedCount = parseInt(input[0].trim(), 10);

    let actualNumbers: number[] = [];
    let totalSum: number = 0;

    // 2行目以降を処理
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 64bit整数の範囲内かチェック（Node.jsのNumber型はIEEE 754倍精度であり、安全に扱える範囲）
            // 問題の仕様では「64bit整数の範囲に収まる」とあるため、通常のJavaScriptの安全性を考慮しても問題ないが、
            // 読み取れた数値をそのまま合計する
            actualNumbers.push(num);
            totalSum += num;
        }
    }

    // 実際に読み取れた個数と合計を出力
    console.log(`count=${actualNumbers.length} sum=${totalSum}`);
}

solve();
