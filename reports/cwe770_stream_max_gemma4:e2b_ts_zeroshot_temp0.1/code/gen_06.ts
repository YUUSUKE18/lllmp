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

        // 整数に変換を試みる
        const num = Number(trimmedPart);

        // 数値として有効であり、64bit整数の範囲内（JavaScriptのNumber型はIEEE 754倍精度で安全だが、ここでは意図的に大きな数値を扱う）
        // 問題文の制約「64bit整数の範囲に収まります」を考慮し、標準的な数値演算で十分と判断する。
        if (!isNaN(num)) {
            // 整数であるか確認（浮動小数点数を無視するため）
            if (Number.isInteger(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 最大値が設定されなかった場合（入力が全て無効な要素のみだった場合）、最大値を0とするか、あるいは仕様に従って処理する。
    // 空の入力や数値が存在しない場合の挙動を明確にするため、count=0, max=0で初期化された状態を維持する。
    if (count === 0) {
        // 入力が空または無効な要素のみの場合、最大値は定義できないが、ここでは0とするのが安全かもしれない。
        // ただし、もし入力が「1,2」のような有効なデータを含んでいれば、それに基づいて計算されるべき。
        // count=0 の場合は maxValue は -Infinity のままになるため、これを 0 に調整する。
        maxValue = 0;
    } else {
        // 最大値が正しく更新されていることを確認
        if (maxValue === -Infinity) {
            // これは発生しないはずだが、念のため
            maxValue = Math.max(...parts.map(p => Number(p.trim())))
        }
    }


    console.log(`count=${count} max=${maxValue}`);
}

solve();
