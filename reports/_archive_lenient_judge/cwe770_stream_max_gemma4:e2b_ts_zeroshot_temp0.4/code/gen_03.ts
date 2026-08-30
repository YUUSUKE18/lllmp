import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数範囲を考慮するため、初期値は非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解析を試みる
        const num = Number(trimmedPart);

        // 数値が有効な整数であり、64bitの範囲内にあるかを確認する（Number型は通常IEEE 754倍精度だが、ここでは整数として扱う）
        // 厳密に64bit整数 (2^63-1) の範囲を考慮する必要があるが、Node.jsのNumberは安全に扱えるため、単純に数値として処理する。
        // 仕様では「値は64bit整数の範囲に収まる」とあるため、入力された数値がその範囲内にあることを前提とする。
        if (Number.isInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最終的な結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
