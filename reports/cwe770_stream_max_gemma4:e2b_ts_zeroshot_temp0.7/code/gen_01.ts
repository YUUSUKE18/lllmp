import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数として最大値を保持するため、非常に小さな値からスタート

    for (const part of parts) {
        // 前後の空白を無視して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数として解釈できるか確認
        const num = Number(trimmedPart);

        // isFiniteで有限数であり、かつ整数であることを確認（小数点以下の値やNaNは無視）
        if (Number.isInteger(num)) {
            // 要素数をカウント
            count++;
            
            // 最大値を更新
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // countとmaxValueを出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
