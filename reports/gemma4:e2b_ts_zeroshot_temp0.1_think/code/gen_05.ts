import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.fd;
    const data = process.stdin.readSync();
    
    if (!data) {
        return;
    }

    // 入力を文字列として取得し、処理する
    const inputString = data.toString().trim();
    
    if (inputString === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = inputString.split(',');

    // 重複を除いた整数を格納するためのSet
    const uniqueNumbers = new Set<number>();
    
    // 合計を格納するための変数 (64bit整数に収まる)
    let sum: number = 0;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();
        
        if (trimmedPart === "") {
            continue; // 空要素は無視
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // 整数として有効であり、かつ重複していないかチェック
        if (Number.isInteger(num)) {
            if (!uniqueNumbers.has(num)) {
                uniqueNumbers.add(num);
                sum += num;
            }
        }
        // 整数として解釈できない要素は無視される
    }

    // 結果を出力
    console.log(`count=${uniqueNumbers.size} sum=${sum}`);
}

solve();
