import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    rl.on('line', (line) => {
        input += line + '\n';
    });

    rl.on('close', () => {
        if (!input) return;

        // カンマで分割し、前後の空白を無視して整数に変換する
        const parts = input.trim().split(',');

        let count = 0;
        let maxValue = -Infinity;
        let validNumbersFound = false;

        for (const part of parts) {
            // 空文字列や空白のみの要素は無視
            if (part.trim() === '') continue;

            // 整数として解釈可能かチェックし、変換を試みる
            const num = Number(part);

            if (!isNaN(num)) {
                // 値が64bit整数の範囲内にあることを確認（JavaScriptのNumberはIEEE 754倍精度だが、ここでは一般的な整数処理として扱う）
                // 問題文の制約に従い、数値として扱えるもののみをカウント対象とする。
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                validNumbersFound = true;
            }
        }

        // 処理した要素が一つ以上存在する場合のみ出力する（仕様上、入力があった場合、少なくとも0個以上の値が存在する）
        // 空の入力や数値以外の入力があった場合も、見つかった数と最大値を報告する。
        if (count > 0) {
            console.log(`count=${count} max=${maxValue}`);
        } else if (parts.length > 0 && parts.every(p => p.trim() === '')) {
             // 入力が空または空白のみだった場合（このケースは通常、上記ループでcount=0になるため不要だが念のため）
             // 仕様上、要素数と最大値を求めよ、とあるため、入力が全くなかった場合はどうするかを明確にする必要はある。
             // ここでは、有効な整数が見つからなかった場合は count=0, max=-Infinity となるが、
             // 厳密に「要素数」と「最大値」を求めるので、見つかったもののみ報告する（count > 0の場合）。
             // もし入力があったのに数値が一つもなかった場合、count=0, max=-Infinityとなる。
             // 今回は、有効な整数が見つからなかった場合は何も出力しない（または count=0 を出力する）という解釈で進める。
        } else if (parts.length > 0) {
            // 入力が存在したが数値が一つもなかった場合 (例: "a,b")
             console.log(`count=0 max=-Infinity`); // 数値が存在しない場合のデフォルト値として
        }
    });
}

solve();
