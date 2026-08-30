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

        // カンマで分割し、空白を無視して整数を抽出する
        const parts = input.trim().split(',');

        let count = 0;
        let maxValue = -Infinity;
        let validNumbersFound = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') continue;

            // 整数として解釈可能かチェック
            const num = Number(trimmedPart);
            if (!isNaN(num)) {
                // 64bit整数の範囲内か確認（JavaScriptのNumberはIEEE 754倍精度だが、ここでは入力値がその範囲に収まることを前提とする）
                // 仕様上、値自体は64bit整数として扱われるため、標準的なJSの数値型で十分。
                if (num >= 0) { // 非負の数のみを対象とすると仮定（一般的な最大値問題の場合）。仕様に明記がないため、負の値も許容するが、最大値を求めるため-Infinityからスタート。
                    count++;
                    if (num > maxValue) {
                        maxValue = num;
                    }
                    validNumbersFound = true;
                } else {
                     // 負の数も考慮する場合、最大値の計算はそのまま行う
                    if (num > maxValue) {
                        maxValue = num;
                    }
                    validNumbersFound = true;
                }
            }
        }

        // 空要素や非整数を無視した後の結果を出力
        if (validNumbersFound) {
            console.log(`count=${count} max=${maxValue}`);
        } else {
            // 有効な整数が一つもなかった場合（空入力やすべて無効な入力の場合）
            // この場合の具体的な出力形式の指定がないため、ここでは0個、最小値として-Infinityまたは0を仮定する。
            // 仕様に基づき、有効な要素が存在しない場合は、何を出力すべきか明確ではないが、
            // 厳密に「要素数」と「最大値」を求めよという指示に従い、データがない場合は適切な値を設定する。
            // 最も安全なのは、入力された整数のみをカウントするという解釈。もし何も見つからなければ0個。
             console.log(`count=0 max=-Infinity`); // または他の適切なデフォルト値。ここでは-Infinityを採用。
        }
    });
}

solve();
