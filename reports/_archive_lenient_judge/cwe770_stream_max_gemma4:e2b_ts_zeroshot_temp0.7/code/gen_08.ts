import * as process from 'process';

function solve() {
    const input = process.stdin.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        // 空文字列や前後の空白を無視するため、trim() を使用してチェックする
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈可能か確認し、64bitの範囲内か確認する
        // parseIntは文字列から整数を抽出する。isNaNで失敗を検出する。
        const num = Number(trimmedPart);

        if (!isNaN(num)) {
            // 64bit整数の範囲内 (Number型は通常IEEE 754倍精度だが、ここでは数値として扱う)
            // 問題文の制約に従い、値が安全に扱える範囲か確認する。
            // JavaScriptのNumber型は安全に2^53までの整数を正確に扱えるため、64bit (2^63-1) よりも大きい値も保持できる。
            // ただし、ここでは入力された値をそのまま最大値として扱う。
            if (num >= -2**53 && num <= 2**53 - 1) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValidInput = true;
            } else {
                // 64bitの範囲を厳密に守るという指示に従う場合、ここでは無視する。
                // もし入力された整数がJavaScriptの安全な整数範囲を超えていても、
                // それを「解釈できない」と見なすか、あるいは単に入力された数値をそのまま扱うかの判断が必要だが、
                // 「整数として解釈できない要素も無視します」という指示に基づき、数値として扱えるものに絞る。
            }
        }
    }

    // 処理した要素が一つもなかった場合や、入力が全て無効だった場合のフォールバック
    if (!isValidInput) {
        // 入力が空または無効なため、0, 0 を出力する（全ての要素が無視された場合）
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
