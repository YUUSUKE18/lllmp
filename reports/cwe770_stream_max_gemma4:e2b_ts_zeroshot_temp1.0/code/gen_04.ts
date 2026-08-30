import * as process from 'process';

function solve() {
    const input = process.stdin.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、空白を除去して整数に変換する
    const parts = input.split(',');
    let validNumbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 数値として解釈できるか確認し、64bit整数に収まるか確認する（ここではNumber型で十分だが、仕様に従う）
        const num = Number(trimmedPart);
        if (!isNaN(num) && num >= -2**53 && num <= 2**53) { // JavaScriptの標準Numberの安全範囲を考慮 (64bit整数より広いが入力値としては妥当)
            validNumbers.push(num);
        }
    }

    if (validNumbers.length === 0) {
        console.log("count=0 max=0");
        return;
    }

    // 要素数を計算
    const count = validNumbers.length;

    // 最大値を計算
    // validNumbersが空でないことが保証されているため、Math.maxで安全に最大値を求める
    let maxValue = validNumbers[0];
    for (let i = 1; i < count; i++) {
        if (validNumbers[i] > maxValue) {
            maxValue = validNumbers[i];
        }
    }
    // または、より簡潔に:
    // const maxValue = Math.max(...validNumbers);


    // 結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
