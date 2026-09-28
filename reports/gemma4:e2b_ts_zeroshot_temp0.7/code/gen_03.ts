import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);
        
        // NaNでない、かつ元の文字列が完全に数字のみで構成されていることを確認する（厳密な整数チェックのため）
        if (!isNaN(num) && String(num) === trimmedPart) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する (合計は64bitに収まるため標準のnumber型で十分)
    let count = 0;
    let sum: number = 0;

    for (const num of uniqueNumbers) {
        count++;
        sum += num;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
