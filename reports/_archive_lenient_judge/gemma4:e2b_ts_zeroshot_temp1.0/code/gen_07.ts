import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 数値として解釈できるかチェックし、整数に変換する
        const num = Number(trimmedPart);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数のみを抽出
    const uniqueNumbersSet = new Set(numbers);
    const uniqueNumbers = Array.from(uniqueNumbersSet);

    // 個数と合計を計算
    const count = uniqueNumbers.length;
    // 合計は64bit整数に収まるため、標準のNumber型（IEEE 754倍精度浮動小数点）でも十分だが、明示的にBigIntや安全性を考慮する。
    // 仕様上64bit範囲内なので、通常のNumberで計算しても問題ないが、念のため安全策として合計はletで初期化し続ける。
    let sum: number = 0;

    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
