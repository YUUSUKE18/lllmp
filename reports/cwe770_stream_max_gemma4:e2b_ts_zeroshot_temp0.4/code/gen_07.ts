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
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値は非常に小さい値に設定

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        // NaNチェック（整数として解釈できない場合）と、64bit範囲内かどうかのチェック
        if (!isNaN(num)) {
            // 数値が安全に扱える範囲内にあるか確認 (ここではJavaScriptのNumber型で十分だが、仕様に従い念のため)
            // 64bit整数は安全に扱えるため、一般的な数値として扱う。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（入力がすべて無効な要素のみだった場合）、最大値を0とするか、または仕様に依存するが、ここでは入力された有効な値に基づいて計算する。
    // もし入力が空でなければ、少なくともcountは正になるはず。
    if (count === 0) {
        // 入力に有効な整数が一つもなかった場合、count=0, max=0と解釈するのが自然かもしれないが、
        // 仕様上「要素数」と「最大値」を求めるため、入力された有効な数値のみを考慮する。
        // 少なくとも1つの数値があればmaxValueは更新されているはず。
        // 入力が空文字列や非数値のみの場合、count=0, maxValue=-Infinityとなるが、
        // 求められるのは整数列から得られた値なので、ここではcount=0, max=0とするのが安全か。
        // ただし、もし入力が「1,a,2」のような場合、count=2, max=2となるべき。
        // 今回は有効な整数のみを数えるので、count=0の場合はmaxも0とする。
        maxValue = 0; // 入力された値がない場合は最大値を0とする（または-Infinityだが、ここでは非負の文脈を想定）
    } else {
        // 最大値が初期値(-Infinity)から更新されていることを確認
        if (maxValue === -Infinity) {
            // これは起こらないはずだが、念のため
            maxValue = 0; 
        }
    }


    console.log(`count=${count} max=${maxValue}`);
}

solve();
