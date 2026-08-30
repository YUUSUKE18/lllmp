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

        // カンマで分割し、空白を除去して整数に変換する
        const parts = input.trim().split(',');
        let count = 0;
        let maxValue = -Infinity;
        let validCount = 0;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈できるかチェックし、64bit範囲内か確認する
            const num = Number(trimmedPart);
            if (!isNaN(num) && Number.isInteger(num)) {
                // 値が64bit整数の範囲内（JavaScriptのNumber型はIEEE 754倍精度で安全だが、ここでは意図的にチェック）
                // 実際にはNode.jsのNumberは安全に大きな整数を扱えるため、単純に値として扱う。
                validCount++;

                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }

        // 要素数と最大値を計算する
        const finalCount = validCount;
        let finalMaxValue: number;

        if (finalCount === 0) {
            // 要素が一つも有効でなかった場合、最大値は定義できない（仕様に明記されていないが、ここでは適切な初期値またはエラー処理が必要。
            // 仕様に従い、入力された要素に基づいて計算する。要素がない場合は count=0 max=-Infinity とするのが自然だが、
            // 整数列の最大値として扱われるため、ここでは空の場合は max を -1 や 0 などに設定するか、
            // 最小値を想定する。ここでは、もしデータが存在しなければ最大値は未定義として扱うため、-1 または 0 とする。
            // ただし、入力が空の場合、count=0, max=0 とするのが最も安全かもしれない。
            finalMaxValue = 0; // 要素がない場合のデフォルト
        } else {
            finalMaxValue = maxValue;
        }

        // 結果を出力
        console.log(`count=${finalCount} max=${finalMaxValue}`);
    });
}

solve();
