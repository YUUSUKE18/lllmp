import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input.length === 0) {
        console.log("count=0 sum=0");
        return;
    }

    // 行ごとに分割し、空行や空白行を無視して整数を抽出する
    const lines = input.split('\n');
    
    let count = 0;
    let sum: bigint = 0n; // 合計は64bit以上の可能性があるためBigIntを使用
    
    // 最初の行は期待される個数だが、実際に読み取れた整数のみを対象とする
    // 2行目以降をチェックする
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '') {
            continue; // 空行は無視
        }

        // 整数としてパースを試みる
        const num = Number(line);
        
        // パースされた値が有効な整数であり、かつ64bitの範囲内であるかを確認
        // (Number型は53bit精度を持つが、ここでは入力された値が64bit整数であるという前提で処理を進める)
        if (!isNaN(num) && Number.isInteger(num)) {
            // 読み取れた整数を対象とする
            count++;
            // 合計をBigIntで加算
            sum += BigInt(num);
        }
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
