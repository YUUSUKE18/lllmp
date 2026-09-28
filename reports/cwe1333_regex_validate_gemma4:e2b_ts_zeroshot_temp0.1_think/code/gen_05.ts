import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("valid=0");
        return;
    }

    // 行ごとに分割する
    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        const trimmedLine = line.trim();

        // 1. 空行の判定
        if (trimmedLine.length === 0) {
            continue; // 空行は妥当ではない
        }

        // 2. 数字とカンマ以外の文字が含まれていないかチェック
        // 正規表現: 数字 (\d) またはカンマ (,) のみで構成されているか
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue; // 不正な文字を含む行は妥当ではない
        }

        // 3. 少なくとも1つの数字が含まれているかチェック
        // 数字が一つもない場合（例: ",," や "," のみ）は妥当ではない
        if (!/\d/.test(trimmedLine)) {
            continue;
        }

        // 上記の条件をすべて満たした場合、妥当である
        validCount++;
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
