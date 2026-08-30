import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    
    // カンマで分割し、トリムして空でない要素をフィルタリングする
    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        
        const num = parseInt(trimmedPart, 10);
        
        // 整数として解釈可能かチェックし、64bit範囲内か確認（ただしparseIntは通常問題ない）
        if (!isNaN(num)) {
            count++;
            hasValidNumber = true;
            if (num > max) {
                max = num;
            }
        }
    }

    // 整数として解釈できた要素数と最大値を計算して出力
    // hasValidNumber が false の場合（入力がすべて無効な文字列だった場合）は、count=0, max=-Infinity となる
    process.stdout.write(`count=${count} max=${max}\n`);
}

solve();
