let input = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
    input += data;
});

process.stdin.on('end', () => {
    // 入力を改行で分割し、行ごとに処理する
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        // 入力が空の場合は何も出力しない
        return;
    }

    // 1行目から読み取れた整数個数 (N)
    // lines[0] は最初の整数個数 N
    const N = parseInt(lines[0], 10);

    if (isNaN(N)) {
        // 最初の行が整数でなかった場合、処理を終了
        return;
    }

    let actualCount = 0;
    let sum = 0n; // 合計は64bit以上の可能性があるため BigInt を使用

    // 2行目以降のデータ (lines[1]から) を処理する
    for (let i = 1; i < lines.length; i++) {
        const num = parseInt(lines[i], 10);

        // 整数として有効かチェック
        if (!isNaN(num)) {
            // 読み取れた整数のみを対象とする
            actualCount++;
            // 合計を BigInt で加算
            sum += BigInt(num);
        }
    }

    // 指定された形式で結果を出力
    console.log(`count=${actualCount} sum=${sum.toString()}`);
});
