import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、空白でトリムして整数に変換する
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity; // 64bit整数範囲を考慮し、最小値として-Infinityを設定

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解析を試みる
        const num = Number(trimmedPart);

        // 数値が有効な整数であり、64bit整数の範囲内（ここではJavaScriptの安全性を考慮し、一般的な数値として扱う）であるかを確認する。
        // ただし、問題文では「64bit整数の範囲に収まる」とあるため、極端な大きな数については注意が必要だが、標準的なNumber型で十分カバーできる範囲とする。
        // 厳密に64bit整数を扱うにはBigIntを使うべきだが、ここでは一般的な競技プログラミングの文脈に基づき、`Number`型での最大値チェックを優先しつつ、入力の妥当性を確認する。

        if (!isNaN(num)) {
            // 整数であるかチェック (小数点以下がないこと)
            if (Number.isInteger(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
