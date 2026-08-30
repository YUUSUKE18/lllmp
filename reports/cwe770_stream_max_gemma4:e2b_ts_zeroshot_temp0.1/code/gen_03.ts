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
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値は非常に小さい値とする

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数字のみで構成されているか（浮動小数点やその他の文字が含まれていないか）を確認する
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 64bit整数の範囲内であることの確認 (JavaScriptのNumber型はIEEE 754倍精度であり、安全に扱える範囲だが、仕様に従い念のためチェック)
            // ここでは、入力が正しく整数として解釈されたことを前提とし、最大値の更新を行う。
            if (num > maxValue) {
                maxValue = num;
            }
            count++;
        }
    }

    // 処理した要素が一つもなかった場合（入力が空または無効な場合）
    if (count === 0) {
        // 仕様上、要素数と最大値を求める必要がある。入力が完全に無効であれば count=0, max=0 とする。
        console.log('count=0 max=0');
    } else {
        // 結果を出力
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
