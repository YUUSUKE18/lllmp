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
        // 空文字列や空白を無視する
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈できるか試みる
        const num = Number(trimmedPart);

        // isFiniteで有限数であり、かつ整数であるかを確認する
        if (Number.isInteger(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（入力がすべて無効な要素のみだった場合）、最大値を0とするか、仕様に従う。
    // 整数として解釈できた要素が存在しない場合は、count=0, max=0とするのが自然だが、
    // 入力された数値自体を最大値として扱うため、もし有効な数値が一つもなかった場合は注意が必要。
    // 仕様では「最大値」を求めるので、有効な要素があればその最大値を出す。
    if (count === 0) {
        // 有効な整数が一つもなかった場合、maxの定義は曖昧だが、ここでは0とする（または-Infinityなど）。
        // 入力された数値が全て無視されたため、最も安全なのは count=0, max=0 とする。
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
