import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    if (line.trim() === '') return;

    const parts = line.trim().split(',');

    if (parts.length < 2) {
        // 要素数と最大値が不足している場合は無視（仕様上、期待される入力形式を想定）
        return;
    }

    try {
        const count = parseInt(parts[0], 10);
        const maxValue = parseInt(parts[1], 10);

        if (isNaN(count) || isNaN(maxValue)) {
            // 数値に変換できない場合は無視
            return;
        }

        // ここでは入力された値（要素数と最大値）をそのまま出力する、という解釈が最も安全です。
        // 仕様の「それらの『要素数』と『最大値』を求めます」は、入力からこれらを抽出することを意味します。
        // そして「count=<個数> max=<最大値> を出力します」なので、抽出した値をそのまま使用します。
        console.log(`count=${count} max=${maxValue}`);

    } catch (e) {
        // その他の予期せぬエラーは無視
    }
});

rl.on('close', () => {
    // 入力処理が完了した
});
