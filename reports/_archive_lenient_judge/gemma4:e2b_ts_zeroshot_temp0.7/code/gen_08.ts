import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数として解析を試みる
        const num = parseInt(trimmedPart, 10);

        // 数値であり、NaNでなく、元の文字列が完全に数値のみで構成されていた場合（厳密なチェックは難しいが、parseIntの挙動に依存）
        // 仕様に従い、「整数として解釈できない要素を無視する」ため、Number型で存在し、かつ整数であるかを確認する。
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた数の合計を計算
    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 結果を出力
    console.log(`count=${uniqueNumbers.size} sum=${sum}`);
}

solve();
