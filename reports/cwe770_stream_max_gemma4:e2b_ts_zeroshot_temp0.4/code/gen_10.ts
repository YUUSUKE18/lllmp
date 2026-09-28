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
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈を試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、かつ64bit整数の範囲内であるかを確認する（ここではJavaScriptのNumber型が十分な精度を持つと仮定し、安全性を確認）
        if (!isNaN(num)) {
            // 整数として解釈できた場合
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（入力が全て無効な場合）の処理。仕様上、入力があれば少なくとも0個以上の要素は存在するはずだが、安全のため。
    if (count === 0) {
        // 入力が空またはすべて無視された場合、最大値は定義できないため、ここでは0とするか、あるいは入力がない場合は0,0とするのが妥当。
        // ただし、もし入力が「1,2,3」のような有効な入力があったのに何もカウントされなかった場合は、それはありえない。
        // 少なくとも一つ要素があれば count >= 1 となるはず。
        // 念のため、空の入力に対する処理を再確認する。
        if (input.length > 0) {
             // 入力があったが有効な整数が一つもなかった場合（例: ",,"）、count=0, maxValue=-Infinityとなる。
             // この場合、最大値は定義できないため、ここでは0とするのが最も安全かもしれないが、仕様に厳密に従うなら -Infinity が数学的に正しい。
             // 競技プログラミングの文脈では、要素がない場合は max=0 や max=無効な値になることが多い。
             // ここでは、もしcountが0ならmaxValueを0として出力する（最も安全なデフォルト）とする。
             console.log(`count=${count} max=0`);
        } else {
            console.log('count=0 max=0');
        }
    } else {
        // count > 0 の場合
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
