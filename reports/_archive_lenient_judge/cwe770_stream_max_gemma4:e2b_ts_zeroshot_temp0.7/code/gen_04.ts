import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、十分小さい値から開始

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能か試みる
        const num = Number(trimmedPart);

        // isFiniteで数値であり、かつ、元の文字列が純粋な整数表現であるかを確認する（NaNやInfinityを避ける）
        if (Number.isInteger(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が見つからなかった場合（入力が全て無効な場合）、最大値を0とするか、仕様に従う。
    // ここでは、もし要素が存在すればその最大値を出す。要素が一つもなかった場合は count=0, max=0 とする。
    if (count === 0) {
        maxValue = 0; // 空の入力や無効な入力のみの場合
    } else if (maxValue === -Infinity) {
        // 数値として解釈できたが、初期化の問題で-Infinityのままの場合（通常は上記ループでカバーされるべき）
        // 少なくとも一つ要素が存在すれば、その最大値は存在するはず。
        // もし入力が全て負の無限大表現などで処理されなかった場合を考慮する。
        // 仕様上、64bit整数なので、入力されたもののみを考慮する。
        // ここでは、もし上記ループでcount>0ならmaxValueは更新されているはずだが、念のため。
    }


    console.log(`count=${count} max=${maxValue}`);
}

solve();
