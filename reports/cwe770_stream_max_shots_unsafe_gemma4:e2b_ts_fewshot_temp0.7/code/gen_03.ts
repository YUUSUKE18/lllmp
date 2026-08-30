import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    
    // カンマで分割し、トリムして空でない要素を抽出
    const parts = input.split(",");
    const numbers = [];
    
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        
        // 整数として解釈可能かチェック
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    const count = numbers.length;
    let maxValue = -Infinity;

    if (count === 0) {
        // 要素が一つもなかった場合の処理。問題の制約から、最小値が存在しない場合はどうするかを考慮する必要があるが、
        // ここでは最大値として定義できないため、例えば 0 や適切なエラー値を設定する。
        // ただし、入力が空の場合、count=0, max=? となる。ここでは入力された整数がないため、maxは未定義とするか、
        // もし制約で正の整数のみが期待されるなら -Infinity などが考えられる。
        // 64bit整数範囲に収まるという指示を考慮すると、もし入力が空なら count=0, max=-1 (または適切なデフォルト) としても良いが、
        // ここでは最も安全な最大値を求めるため、空の場合は特別な処理をするか、問題の意図に従う。
        // 既存の例で「max」が存在しない場合はどうなるか不明だが、ここでは入力された数値のみを考慮する。
        // 数値がない場合は、最大値は定義できないが、もし0未満の入力があった場合も同様に処理されるため、
        // 最小値を設定して次の比較に進むようにする。
        maxValue = -Infinity; // 最大値が存在しない場合の初期値
    } else {
        for (const num of numbers) {
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 64bit整数の範囲内であるため、-Infinityを扱う際は注意が必要だが、ここでは出力形式に合わせる。
    // 入力された数値がすべて正の整数やゼロの範囲であれば問題ない。
    // もし入力が空の場合 (count=0)、max=? となる。最大値が存在しない場合は、例えば 0 または -1 を選ぶことも考えられるが、
    // ここでは-Infinityをそのまま出力するか、あるいは入力がない場合は max=0 とする（制約を無視して）
    if (count === 0) {
        maxValue = 0; // 入力がなければ最大値は0とする（最も安全なデフォルトの一つ）
    }


    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
