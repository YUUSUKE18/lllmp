import * as readline from 'readline';

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
    if (input.trim() === '') {
        return;
    }

    // カンマで分割し、空白を無視して整数に変換する
    const parts = input.trim().split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }
        // 整数として解釈可能かチェックし、64bit範囲に収まるか確認する
        const num = Number(trimmedPart);

        if (!isNaN(num) && isFinite(num)) {
            // 数値の範囲チェック (64bit整数: 約 -9e18 から 9e18)
            // JavaScriptのNumberはIEEE 754倍精度であり、安全に扱うためにはBigIntを使うべきだが、
            // 仕様が「64bit整数の範囲に収まる」とあるため、標準のNumber（53bit整数精度）で十分な場合が多い。
            // ここでは入力された値がJavaScriptの安全な数値型として扱える範囲内にあるかを確認する。
            const bigIntValue = BigInt(num);
            if (bigIntValue >= Number.MIN_SAFE_INTEGER && bigIntValue <= Number.MAX_SAFE_INTEGER) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            } else if (
                // 安全な範囲外の場合でも、仕様に従い無視するかどうか。
                // 今回は「整数として解釈できない要素も無視」という指示を優先する。
                // 厳密に64bit整数（2^63-1あたり）のチェックを行う。
            ) {
                // 仕様上は値が64bit整数の範囲に収まることを前提とするため、数値として変換できたものを採用する。
                // より厳密な64bit整数チェックが必要ならBigIntで処理すべきだが、標準入力からの読み取りをNumberで行う。
                // ここでは、単に有効な整数値があればカウントし、最大値を更新する。
            }
        }
    }

    // すべての要素が無視された場合（またはデータがない場合）、適切な出力を生成する必要があるか？
    // 仕様に基づき、読み取れた有効な数だけをカウントする。
    if (count > 0) {
        console.log(`count=${count} max=${maxValue}`);
    } else {
        // 要素が一つも有効でなかった場合の挙動は明記されていないが、
        // ゼロ要素と最大値の出力を試みる（-Infinityになる可能性があるため注意）。
        // データが存在しない場合は何を出力すべきか不明なため、読み取れた数に基づいて出力する。
        // 空の入力や無効な入力のみの場合を想定し、count=0, max=? となるが、max=-Infinityが問題になる。
        // ここでは、データが存在すれば必ず count > 0 となることを期待する。
        // もし空の入力や全て無効な値での入力を想定する場合、具体的な仕様が必要。
        // 今回は読み取れた有効な要素数と最大値をそのまま出力する。
        if (parts.length > 0) {
             // すべての入力が無視された場合（例: "a,b"）、count=0, maxValue=-Infinity となる。
             console.log(`count=0 max=-Infinity`);
        }
    }
});
