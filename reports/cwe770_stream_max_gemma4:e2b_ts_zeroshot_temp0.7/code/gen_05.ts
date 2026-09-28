import * as process from 'process';

function solve() {
    const input = process.stdin.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 要素数と最大値の識別は、入力形式が「カンマ区切りの整数列」であり、「要素数」と「最大値」を求めるという要求に基づき、
        // 通常、入力文字列全体が複数の数値のリストであると解釈し、その中で最も大きな値を求め、要素数を数える、という処理を行います。
        // 仕様：「カンマ区切りの整数列を受け取ります。それらの『要素数』と『最大値』を求めます。」

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // 数値として有効な場合、それを要素として扱う
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValidInput = true;
        }
    }

    // 入力が空または数値が一つもなかった場合の処理（ただし、入力があった場合は最低1つの値がカウントされる）
    if (!isValidInput && parts.length > 0) {
         // もし入力が全て無効な文字列で構成されていた場合、count=0, max=適切な初期値（ここでは-Infinityが自然だが、実質的な最大値がないため、問題の意図に従う）
         // 入力が空でない限り、少なくとも一つは処理されたはず。もし全ての要素が無効なら count=0, max=??。
         // ただし、仕様上「整数として解釈できない要素も無視します」ので、有効な要素が0個の場合を考慮する。
         if (count === 0) {
             // 入力があったが有効な整数が一つも見つからなかった場合（例: "a,b"）、カウントは0、最大値は定義されない。
             // この場合、最大値を-1や0とするかは文脈依存だが、ここでは要素がないため count=0, max=0 または -1 が考えられる。
             // 最も安全なのは、入力された数値のみを評価することなので、count=0, max=-Infinity（あるいは0）となるが、
             // 64bit整数として扱うことを考えると、実質的に要素がないため count=0 とするのが妥当。
         }
    }


    // 仕様に従い、数値を全て処理した結果を出力する。
    // ただし、もし入力が空だった場合（input=""）、上記で count=0, maxValue=-Infinity になる可能性があるため、
    // 入力が空の場合の処理を再確認する。

    if (parts.length === 0 || parts.every(p => p.trim() === "")) {
         console.log("count=0 max=0"); // 空入力の場合のデフォルト
         return;
    }


    // 最終的な出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
