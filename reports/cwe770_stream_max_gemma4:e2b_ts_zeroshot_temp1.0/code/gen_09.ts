import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        process.stdout.write('count=0 max=0\n');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bitの範囲を考慮するため初期値を非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈する
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解析を試みる
        const num = Number(trimmedPart);

        // 数値であり、64bitの範囲内であるか確認する（ここではNumber型が十分広いと仮定）
        if (!isNaN(num) && isFinite(num)) {
            // 要素数カウント
            count++;

            // 最大値の更新
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // countとmaxValueを出力する
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
