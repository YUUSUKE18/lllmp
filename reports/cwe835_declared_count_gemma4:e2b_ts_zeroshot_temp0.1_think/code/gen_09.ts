import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // 行ごとに分割し、空行や空白行を無視して整数を抽出する
    const lines = input.split('\n');
    
    let actualNumbers: number[] = [];

    // 1行目から始まるすべての行をチェック
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            continue; // 空行は無視
        }

        // 整数としてパースを試みる
        const num = Number(trimmedLine);
        
        // パースが成功し、数値が有効であるか確認する
        if (!isNaN(num)) {
            // 読み取れた整数を格納
            actualNumbers.push(num);
        }
    }

    // 実際に読み取れた個数と合計を計算する
    const actualCount = actualNumbers.length;
    
    // 合計を計算するために BigInt を使用する (64bit整数の合計は標準のNumber型でオーバーフローする可能性があるため)
    let totalSum = BigInt(0);
    for (const num of actualNumbers) {
        totalSum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${actualCount} sum=${totalSum.toString()}`);
}

solve();
