import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    // 重複を除いた整数を格納するためのSet
    const uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // 整数であり、NaNではないことを確認
        if (!isNaN(num)) {
            // 整数として格納
            uniqueNumbers.add(num);
        }
    }

    // ユニークな要素の個数と合計を計算
    const count = uniqueNumbers.size;
    
    // 合計を計算
    uniqueNumbers.forEach(n => {
        sum += n;
    });

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
