import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let data = '';
    
    // 標準入力全体を読み込む（通常は一度に全て読み込まれることを期待する）
    // この環境では、readline.on('line', ...) のイベントベースで処理を進めるのが一般的だが、
    // 厳密に標準入力からのカンマ区切りの列を処理するため、ここでは標準入力全体を待つ形をとる。
    // 標準入力が一度のブロックとして与えられることを想定し、全ての入力を待つ。

    // readFileSync や fs モジュールを使わずにストリームで処理するために、行ごとに読み込む方法を採用する。
    let allInput = '';
    
    // すべての入力を読み込む
    process.stdin.on('data', (chunk: string) => {
        allInput += chunk;
    });

    process.stdin.on('end', () => {
        if (!allInput) return;

        // 入力をカンマで分割し、空白や空要素をフィルタリングする
        const parts = allInput.split(',');
        
        let uniqueNumbers = new Set<number>();
        let sum: bigint = 0n;

        for (const part of parts) {
            // 前後の空白を除去して整数に変換を試みる
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            const num = Number(trimmedPart);
            
            // 整数として解釈でき、かつ重複していないかチェックする（仕様では「重複を除いた整数」の個数と合計を求める）
            if (!isNaN(num)) {
                uniqueNumbers.add(num);
            }
        }

        // セット内の要素に対して合計を計算する
        for (const num of uniqueNumbers) {
            sum += BigInt(num);
        }

        const count = uniqueNumbers.size;
        
        // 結果を出力
        process.stdout.write(`count=${count} sum=${sum}\n`);
    });
}

solve();
