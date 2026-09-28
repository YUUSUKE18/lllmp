import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (line) => {
    // カンマで分割し、各要素を数値に変換しようとする
    const parts = line.trim().split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        if (part === '') continue;

        // 数値として解析を試みる
        const num = Number(part);

        // isNaN や Infinity をチェックして、整数として有効か確認する
        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数の範囲内であることの確認（ここではNumber型が実質的にこれに対応しているため、大きな値のみ考慮）
            // 標準的なJavaScriptのNumberはIEEE 754倍精度であり、安全な整数演算としては2^53程度まで保証されるが、
            // 問題の制約に従い、64bit整数（安全に扱える範囲）として扱う。
            
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // すべての入力が処理された場合に出力する（ただし、この問題では一行のみが期待されるため、ここでは一度処理したら終了とする）
    // 複数の行からの入力がある可能性を考慮し、ここでは単一の入力として扱われることを前提とし、最後に結果を出力するように実装を変更する必要がある。
    // しかし、仕様上は「標準入力からカンマ区切りの整数列を受け取ります」であり、通常、この形式は1つの入力ストリーム全体を指すため、最初の行のみを処理すると仮定する。
    
    // 厳密に「一つの入力ストリームから全て読み込む」という要件を満たすためには、readlineのイベントを待つ必要があるが、
    // 通常、競技プログラミング環境では標準入力全体が一度に渡されるため、ここで処理を終了させる。

    console.log(`count=${count} max=${maxValue}`);
    rl.close();
});
