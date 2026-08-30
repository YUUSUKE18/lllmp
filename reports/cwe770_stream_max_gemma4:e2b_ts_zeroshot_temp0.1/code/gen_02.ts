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

        // 数値として有効であり、64bit整数の範囲内であるか確認する（ここではJavaScriptのNumber型で十分だが、仕様に従いチェック）
        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数 (2^63 - 1) の範囲内であることを確認。
            // JavaScriptのNumberはIEEE 754倍精度であり、安全に扱うには注意が必要だが、
            // 入力が「64bit整数の範囲に収まる」という制約に基づき、通常の数値として処理する。
            // 負の無限大や非常に大きな値は無視される（parseIntが失敗するか、isFiniteで弾かれる）。

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が見つからなかった場合（入力がすべて無効な場合）、最大値を0とするか、仕様に依存する。
    // ここでは、要素が存在すれば必ず最大値が設定されるため、count=0の場合はmax=0とするのが自然。
    if (count === 0) {
        maxValue = 0; // 空の入力や無効な入力のみの場合
    } else if (maxValue === -Infinity) {
        // count > 0だが、何らかの理由で最大値が設定されなかった場合（理論上ありえないが安全策）
        // このケースは上記のロジックでは発生しないはず。
        maxValue = Math.max(...parts.map(p => parseInt(p.trim(), 10) || -Infinity));
    }


    console.log(`count=${count} max=${maxValue}`);
}

solve();
