import * as readline from 'readline';

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    for await (const line of rl) {
        lines.push(line.trim());
    }

    if (lines.length === 0) {
        // 入力が全くない場合は何も出力しない（仕様上は1行目がある前提だが念のため）
        return;
    }

    // 1行目から個数を取得
    const countStr = lines[0];
    if (!countStr) {
        // 1行目が空の場合
        return;
    }

    let count: number;
    try {
        count = parseInt(countStr, 10);
    } catch (e) {
        // 1行目が整数でない場合
        return;
    }

    let sum: bigint = 0n;
    let actualReadCount = 0;

    // 2行目以降から整数を読み取り、処理する
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line === "") {
            continue; // 空行は無視
        }

        try {
            const num = BigInt(line);
            sum += num;
            actualReadCount++;
        } catch (e) {
            // 整数として解釈できない行は無視
            continue;
        }
    }

    // 仕様: 実際に読み取れた整数だけを対象とする。
    // 1行目の値と実際の読み取った個数が一致しない可能性がある。
    // 最終的に出力するのは、実際に読み取れた個数と合計。
    
    // ただし、仕様の解釈として、「実際に読み取れた整数だけを対象とします」が、
    // 1行目の値が期待値であるというよりは、入力ストリームから読めたもの全てを対象とすることを意味すると解釈します。
    // 1行目の値は、入力された個数を示すものとして扱われますが、処理対象は実際に読み取れた数です。

    console.log(`count=${actualReadCount} sum=${sum.toString()}`);
}

solve();
