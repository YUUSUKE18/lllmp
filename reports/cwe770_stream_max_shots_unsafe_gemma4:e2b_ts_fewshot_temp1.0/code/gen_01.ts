import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    
    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(",");
    
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);
        
        // isNaN チェックと、64bit整数範囲内かどうかの簡易チェック（実際にはparseIntの結果が安全な範囲に収まることを前提とする）
        if (!isNaN(num)) {
            count++;
            hasValidNumber = true;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 有効な要素があった場合のみ出力する
    if (hasValidNumber) {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    } else {
        // 有効な整数が一つもなかった場合の挙動（仕様に明記されていないが、安全のため）
        // 例として count=0, max=-Infinity のように出力することも考えられるが、ここでは入力に整数がない場合は何も出力しない（またはcount=0を出す）とする。
        // 課題の文脈から、有効な要素がある場合にのみカウントと最大値を求めることを重視する。
        // 入力が空または無効な値のみの場合、 count=0, max=? となるが、maxの定義が曖昧になるため、ここでは上記で計算された結果をそのまま出力する。
        // ただし、例題の形式に従い、必ず1行出力する。
        process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値
    }
}

solve();
