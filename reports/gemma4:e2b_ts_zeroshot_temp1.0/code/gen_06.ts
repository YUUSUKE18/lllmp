import * as process from 'process';

function solve() {
    const input = process.stdin.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 数値として解釈できるかチェック
        const num = parseInt(trimmedPart, 10);
        
        // NaNでなければリストに追加（整数のみを対象とする）
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数リストを作成
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
