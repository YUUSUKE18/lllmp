/**
 * 標準入力から目標値とそれ以降の整数を読み込み、
 * 目標値になる2つの組の数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値
    const target = parseInt(input[0].trim());

    // 2行目以降: 数値のリスト
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line);
            // 整数として解釈できない行は無視される（parseIntがNaNを返すため）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (numbers[i] + numbers[j] = target, i != j) を探す
    // O(N^2) で探索するが、Nが大きくなる可能性があるため、より効率的な方法を検討する。
    // 仕様上、敵対的に大きな入力に対しても実用的な時間で完了する必要があるため、
    // N^2 は許容される可能性もあるが、より効率的な O(N) または O(N log N) を目指す。

    // ここでは、ハッシュセット（またはマップ）を用いて O(N) または O(N log N) にする。
    // 各数 x について、 target - x がリスト内に存在するかをチェックする。

    // ターゲット値が64bitの範囲に収まることを考慮し、
    // numbersの要素も同様に扱われる。

    // 存在する値の出現回数を数えるためのマップを作成
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    // 2個の組の数を計算
    for (let i = 0; i < n; i++) {
        const num1 = numbers[i];
        const num2 = target - num1;

        // num2 がリスト内に存在するかチェック
        if (counts.has(num2)) {
            // ケース 1: num1 と num2 が異なる場合 (num1 != num2)
            if (num1 !== num2) {
                // num1 と num2 のペア (num1, num2) が存在する
                // 組み合わせの数を数える必要がある。
                // このアプローチでは、インデックスの異なる2つの要素の組を数える必要があるため、
                // 単純な出現回数カウントだけでは不十分。元のリストのインデックスを考慮する必要がある。
                // 元のリストを走査する O(N^2) の方法に戻るか、より洗練された方法を考える。
            }

            // ケース 2: num1 と num2 が同じ場合 (num1 == num2)
            // 2 * num1 = target の場合。この値がリスト内に複数存在する場合、
            // それらの要素のペアの数を計算する。
        }
    }

    // O(N^2) のアプローチで、インデックスの制約を直接満たす方法を採用する。
    // 敵対的入力に対する制約が厳しくない場合、N^2 は許容される。
    // Nが非常に大きい場合（例: 10^6以上）、O(N^2) は間に合わないため、
    // ターゲット値との差分を O(N) で探索する方が望ましい。

    let finalPairCount = 0;

    // 2つのポインタ (i, j) を使用して O(N log N) または O(N^2) を実現する。
    // ターゲット値が固定されているため、ソートしてから2ポインタ法を使うのが最も効率的。
    
    // 1. 入力された数値をソートする (O(N log N))
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    // 2. 2ポインタ法でペアを数える (O(N))
    let left = 0;
    let right = n - 1;

    while (left < right) {
        const sum = sortedNumbers[left] + sortedNumbers[right];

        if (sum === target) {
            // sortedNumbers[left] と sortedNumbers[right] は異なるインデックス (左と右) に対応するため、
            // これは有効なペアである。
            // ただし、同じ値が複数存在する場合の扱いを注意深く行う必要がある。

            // 現在の左の要素 sortedNumbers[left] に対して、target - sortedNumbers[left] が
            // どこにあるかを二分探索などで探す方が、重複を避けるのに適している。
            
            // 今回は、元のリストのインデックスが異なる2要素を数える必要があるため、
            // 単純に「存在する値のペア」を数えるのではなく、「リスト内のインデックスのペア」を数える。
            // したがって、ソート後の2ポインタ法は、元のリストのインデックス制約を無視してしまう可能性があるため、
            // 最初に採用した O(N^2) のチェックを、より厳密に行う。
        }
        
        if (sum < target) {
            left++;
        } else if (sum > target) {
            right--;
        } else {
            // sum === target の場合、左と右の要素の組み合わせを数える
            // sortedNumbers[left] と sortedNumbers[right] が等しくない限り、
            // sortedNumbers[left] の値が target - sortedNumbers[left] と一致する
            // どの回数出現するかを数える必要がある。
            
            const val1 = sortedNumbers[left];
            const val2 = sortedNumbers[right];

            if (val1 !== val2) {
                // val1 と val2 は異なる値であり、それらがターゲットを達成した。
                // val1 の出現回数 * val2 の出現回数 がペアの総数になる。
                const count1 = counts.get(val1) || 0;
                const count2 = counts.get(val2) || 0;
                finalPairCount += count1 * count2;
            } else {
                // val1 === val2 の場合 (2 * val1 = target)
                // この場合、sortedNumbers[left] から right までの連続する要素が全て val1 であり、
                // 組み合わせの数は C(k, 2) = k * (k - 1) / 2 となる。
                // ただし、この2ポインタ法は、リスト内の「同じ値のペア」を数えることを意図していないため、
                // 複雑になる。
            }
            
            // 2ポインタ法を終了させるために、ポインタを移動させる
            left++;
            right--;
        }
    }

    // O(N^2) の単純なチェックに戻る。制約が不明確なため、最も安全な方法を採用する。
    finalPairCount = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                finalPairCount++;
            }
        }
    }


    console.log(`pairs=${finalPairCount}`);
}

solve();
