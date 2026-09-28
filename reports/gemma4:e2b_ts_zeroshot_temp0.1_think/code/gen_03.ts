let input = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
    input += data;
});

process.stdin.on('end', () => {
    if (!input) {
        // No input provided
        return;
    }

    // 1. カンマで分割し、各要素を処理する
    const tokens = input.split(',');

    // 2. 重複を除いた整数を格納するためのSet
    const uniqueNumbers = new Set<number>();

    for (const token of tokens) {
        // 前後の空白をトリム
        const trimmedToken = token.trim();
        if (trimmedToken === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedToken);

        // 整数であり、NaNではないことを確認
        if (!isNaN(num) && Number.isInteger(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 3. 個数と合計を計算する
    const count = uniqueNumbers.size;
    let sum = 0;

    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 4. 結果を出力する
    console.log(`count=${count} sum=${sum}`);
});
