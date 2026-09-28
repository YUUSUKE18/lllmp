import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bitの範囲を考慮するため、初期値は非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値が有効な整数であり、64bitの範囲内にあるか確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数の範囲に収まることを前提とする
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない場合（入力が全て無効な場合）、最大値を0として扱うか、あるいは仕様に従い-Infinityをどう扱うかを決定する必要がある。
    // 入力が空または無効な要素のみの場合、count=0, max=0が妥当と思われる。
    if (count === 0) {
        console.log('count=0 max=0');
    } else {
        // maxValueは最初に読み取った有効な値を持つ
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
