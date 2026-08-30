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
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値を非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数字のみで構成されているか（浮動小数点や非数値が含まれていないか）を確認する
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 64bit整数の範囲内であるか確認 (JavaScriptのNumberはIEEE 754倍精度だが、ここでは入力値がその範囲内と仮定し処理を進める。問題文の制約に従う)
            // 実際には、入力が安全に64bit整数として扱えることを前提とする。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が見つからなかった場合（入力がすべて無効な場合）の処理。
    // 仕様上、要素が存在すれば最大値は定義されるはずだが、空入力や全て無視された場合はどうするか？
    // ここでは、少なくとも1つの有効な要素があれば count と maxValue を出力する。
    if (count === 0) {
        // 入力が空または無効な場合、count=0, max=0 とする（最も安全なデフォルト）
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
