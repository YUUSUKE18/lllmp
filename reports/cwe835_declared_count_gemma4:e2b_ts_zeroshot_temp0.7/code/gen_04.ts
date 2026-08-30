import * as readline from 'readline';

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    
    // すべての行を読み込む
    for await (const line of rl) {
        lines.push(line.trim());
    }

    if (lines.length === 0) {
        // 入力が全くなかった場合
        console.log("count=0 sum=0");
        return;
    }

    // 1行目を個数としてパースする
    const countLine = lines[0];
    const initialCount = parseInt(countLine);

    let actualCount = 0;
    let sum: bigint = 0n;

    // 2行目以降を整数として処理する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line === "") {
            continue; // 空行は無視
        }

        const num = parseInt(line);
        
        // 整数として解釈できるかチェックし、64bit範囲内かチェック
        if (!isNaN(num) && String(num) === line) {
            // 整数として読み取れたもののみを対象とする
            actualCount++;
            sum += BigInt(num);
        }
    }

    // 最終結果を出力
    console.log(`count=${actualCount} sum=${sum.toString()}`);
}

solve();
