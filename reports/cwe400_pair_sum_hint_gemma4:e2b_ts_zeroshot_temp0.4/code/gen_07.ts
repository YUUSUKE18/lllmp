/**
 * 標準入力から目標値と整数を受け取り、目標値になる2つの組の個数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目は目標値
    const target = parseInt(input[0].trim(), 10);

    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了（仕様上は入力が保証されているが安全策）
        console.log('pairs=0');
        return;
    }

    let numbers: number[] = [];

    // 2行目以降を読み込み、整数としてパースする
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === "") continue;

        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2つの組 (i, j) を探す (i != j)
    // O(N^2) のアプローチ。Nが十分に大きくても、制約によっては許容される可能性がある。
    // 敵対的に大きな入力に対しても実用的な時間で完了する必要があるため、
    // より効率的な O(N log N) または O(N) のアプローチを検討する。

    // O(N) または O(N log N) のアプローチ:
    // 2つの値 a と b が存在し a + b = target となるペア (a, b) の数を数える。
    // 実際には、入力された数列の中から、ターゲットから i を引いた値 (target - numbers[i]) が
    // その数列の中に存在するかどうかをチェックすればよい。

    // 存在チェックを高速化するため、ハッシュセット（Set）を使用する。
    const numberSet = new Set(numbers);
    let foundPairs = 0;

    for (let i = 0; i < n; i++) {
        const num1 = numbers[i];
        const num2 = target - num1;

        // num1 と num2 が同じ値になる場合 (つまり 2 * num1 = target)
        if (num1 === num2) {
            // この値が数列内に少なくとも2回存在する場合のみペアとしてカウントする。
            // この問題は「位置が異なる 2 個の組」を求めるため、
            // 2つの異なるインデックス i と j (i != j) に対して numbers[i] + numbers[j] = target となるペアを数える。
            
            // 2 * num1 = target の場合、この値が複数回出現すれば、組み合わせは C(count, 2) となる。
            // ただし、現在のループ構造では、i番目の要素と、それ以外の要素とのペアを数える必要がある。
            
            // 簡略化のため、まずは i番目の要素と、それより後に現れる要素とのペアを数えるようにする。
            // または、Setを使って、i番目の要素と target - numbers[i] が存在するかをチェックする。
            
            // 2 * num1 = target の場合、i番目の要素自身とのペアは除外する必要がある。
            if (numberSet.has(num2)) {
                // num1 と num2 が同じ値の場合 (i番目の要素と、別のインデックス j の要素)
                // このケースは、同じ値が複数回出現する場合にのみカウントされる。
                // このアプローチでは、Setを使うことで、i番目の要素と、数列内の他の要素とのペアを数えることになる。
                
                // 2 * num1 = target の場合、i番目の要素と、同じ値を持つ他の要素とのペアを考える。
                // これは、同じ値が k 個ある場合、C(k, 2) 個のペアを生成する。
                // この処理は、ループの外で集計する方が自然。
            }
        } else {
            // num1 と num2 が異なる場合
            if (numberSet.has(num2)) {
                // num1 と num2 が異なる値の場合、(num1, num2) の組が見つかった。
                // i番目の要素と、num2を持つ要素とのペア。
                // 注意: この方法では、同じ値を持つ要素の重複カウントや、順序の問題が発生する可能性があるため、
                // 以下の「出現回数ベース」のアプローチに切り替える。
                foundPairs++;
            }
        }
    }

    // --- 出現回数ベースの正確なカウント ---
    // ターゲットからの差分をマップでカウントする
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let finalPairs = 0;

    // ターゲットの半分をチェックする
    for (const [num1, count1] of counts.entries()) {
        const num2 = target - num1;

        if (counts.has(num2)) {
            const count2 = counts.get(num2)!;

            if (num1 < num2) {
                // num1 と num2 が異なる場合
                // count1 * count2 個のペアが見つかる。
                finalPairs += count1 * count2;
            } else if (num1 === num2) {
                // num1 と num2 が同じ場合 (2 * num1 = target)
                // count1 個の要素から 2 つを選ぶ組み合わせ C(count1, 2)
                finalPairs += (count1 * (count1 - 1)) / 2;
            }
        }
    }

    console.log(`pairs=${finalPairs}`);
}

solve();
