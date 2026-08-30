import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const tokens = input.split(',');
    const numbers: number[] = [];

    for (const token of tokens) {
        // 空文字や空白を除去してから整数に変換を試みる
        const trimmedToken = token.trim();
        if (trimmedToken) {
            const num = parseInt(trimmedToken, 10);
            // isNaNチェックと、それが整数であることを確認する（ただしparseIntはそれ自体で文字列の先頭から数字を読み取るため、残りの文字がある場合は注意が必要だが、ここでは厳密な整数のみを対象とする）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を取得
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum = 0;

    for (const num of uniqueNumbers) {
        count++;
        sum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
