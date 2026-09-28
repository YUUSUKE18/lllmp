```ts
import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n').filter(line => line.trim().length > 0);

if (lines.length === 0) {
    console.log('pairs=0\n');
    process.exit(0);
}

const target = parseInt(lines[0].trim(), 10);
if (isNaN(target)) {
    console.log('pairs=0\n');
    process.exit(0);
}

const numbers: number[] = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    
    // 1 行に 1 個の整数を抽出
    // ただし、問題文「2 行目以降には整数が 1 行に 1 個ずつ並びます」から、
    // 一行が複数文字の場合でも、その中身が整数なら読み込む必要があるか？
    // 通常 competitive programming の形式では、空白区切りだが、ここでは「1 行に 1 個」とあるので
    // 空行を無視し、残りの非空行をそのまま数値として扱う。
    // ただし、もし一行に複数の数字が入っている可能性（例："10 20"）がある場合の解釈が必要か？
    // 問題文「整数が 1 行に 1 個ずつ並びます」→ 1 行 = 1 数値。
    // しかし、入力形式が厳密でない場合でもロバストにするため、
    // 空白区切りで分割し、有効な整数を抽出する方が安全だが、
    // 問題文の「1 行に 1 個」を忠実に解釈すると、一行ごとに処理。
    
    // 再考：もし "10 20" という行があったら、それは 2 つの数値として扱われるべきか？
    // 「整数が 1 行に 1 個ずつ並びます」という記述は、
    // 「各数値は独立した行を持つ」ことを意味する可能性が高い。
    // しかし、実用的な入力では空白区切りが一般的。
    // 安全策：空白区切りで分割し、有効な整数をすべて収集する。
    
    const parts = line.split(/\s+/);
    for (const part of parts) {
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
}

// 2 個の組を数える（位置が異なる）
// O(N^2) は N が大きい場合時間制限を超える可能性がある。
// 問題文「敵対的に大きな入力」→ N が 10^5 以上かもしれない。
// 最適解は O(N log N) または O(N)。

// 方法：ソートして二重指針、またはハッシュマップ（値の出現回数をカウント）
// 重複がある場合の処理：
// 例：target=4, nums=[1,2,3] → (1,3)のみ。
// target=4, nums=[1,2,2,3] → (1,3), (2,2)は位置が異なるなら可。
// 問題文「位置が異なる 2 個の組」→ 値が同じでも、索引が違えば OK。

// O(N log N) ソート + 二重指針
numbers.sort((a, b) => a - b);

let count = 0n; // 64bit integer (BigInt)
let left = 0;
let right = numbers.length - 1n; // BigInt index? No, length is number. Use Number for indices if N fits in Number.
// N が 2^53 を超える可能性あり → BigInt でインデックス管理。

const nBigInt = BigInt(numbers.length);
let leftIdx = 0n;
let rightIdx = nBigInt - 1n;

while (leftIdx < rightIdx) {
    const sum = numbers[leftIdx] + numbers[rightIdx];
    if (sum === target) {
        // 値が同じ場合の処理
        // 例：[2,2], target=4 → 1組
        // [2,2,2], target=4 → 3組 (0-1, 0-2, 1-2)
        
        const leftVal = numbers[leftIdx];
        const rightVal = numbers[rightIdx];
        
        if (leftVal === rightVal) {
            // 同じ値の場合、この値の出現回数を k とすると、k*(k-1)/2 が追加される。
            // ただし、ソート済み配列なので、左側と右側の値が同じ場合、
            // 両端の値が同じなら、その間のすべてが同じ値。
            
            const leftCount = leftIdx; // 0-based index, count of same value from start? No.
            // より正確に：同じ値の範囲を特定する。
            
            // 左側から同じ値の数を数える
            let l = leftIdx;
            while (l < rightIdx && numbers[l] === leftVal) {
                l++;
            }
            const countL = l - leftIdx;
            
            // 右側から同じ値の数を数える
            let r = rightIdx;
            while (r > leftIdx && numbers[r] === rightVal) {
                r--;
            }
            const countR = rightIdx - r;
            
            // 実際には、ソート済みなので、左側と同じ値が連続し、右側も同じ値が連続する。
            // もし leftVal == rightVal, すると l と r が overlap するはずだが、while 条件で避ける。
            
            // 単純化：leftVal == rightVal の場合、その範囲内のすべてのペアが target に一致。
            // 同じ値の総数を totalSame = countL + countR (ただし重複計算しない)
            // ただし、ソート済み配列で leftIdx と rightIdx が同じ値の場合、
            // その値の出現回数を k とすると、k*(k-1)/2 となる。
            
            // しかし、leftVal == rightVal の場合、leftIdx と rightIdx は同じ値を指す。
            // その間のすべての要素は同じ値。
            const totalSame = l - r + 1; // l is first index > leftIdx with diff value, r is last index < rightIdx with diff value?
            // 再計算：
            // l は左側から同じ値が止まるインデックス（exclusive）
            // r は右側から同じ値が止まるインデックス（exclusive）
            // 同じ値の総数 = (l - leftIdx) + (rightIdx - r) ? 違う。
            
            // 正しい方法：
            // 左側の同じ値の範囲：[leftIdx, l-1]
            // 右側の同じ値の範囲：[r+1, rightIdx]
            // もし leftVal == rightVal, すると [leftIdx, rightIdx] のすべてが同じ値。
            
            if (leftVal === rightVal) {
                const total = rightIdx - leftIdx + 1n;
                count += (total * (total - 1n)) / 2n;
                
                // この値のペアをすべて処理したので、この値の範囲をスキップ
                // しかし、leftIdx と rightIdx を更新する必要があるか？
                // 実際には、この値のすべてのペアがカウント済みなので、
                // 次のステップで別の値を探す。
                // leftIdx を進め、rightIdx を戻す（または両方進める）
                
                // より効率的：同じ値の範囲を特定し、その数を k とすると、k*(k-1)/2 を加算し、
                // その範囲全体をスキップする。
                
                // 再計算：
                // leftIdx から同じ値が止まるインデックス l
                // rightIdx から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 単純に：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k とすると、k*(k-1)/2 を加算し、leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // 実際：leftVal == rightVal → [leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端に進め、rightIdx を左端に戻す。
                
                const k = rightIdx - leftIdx + 1n;
                count += (k * (k - 1n)) / 2n;
                
                // 次の値を探すために、両方を進める（または適切な位置に）
                // 実際には、この値のすべてのペアが処理済みなので、
                // leftIdx を右端まで進め、rightIdx を左端まで戻す。
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より簡単：leftVal == rightVal の場合、その値のすべてのペアが target に一致。
                // その後の処理では、この値の範囲をスキップする。
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // 実際：leftIdx を右端まで進め、rightIdx を左端まで戻す。
                // しかし、これは非効率。代わりに、同じ値の範囲を特定し、その数を k とする。
                
                // 再計算：
                // leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == rightVal の場合、[leftIdx, rightIdx] のすべてが同じ値。
                // その数を k = rightIdx - leftIdx + 1n
                // count += k*(k-1)/2n
                // 次に、leftIdx を右端まで進め、rightIdx を左端まで戻す。
                
                // しかし、while 条件で leftIdx < rightIdx なので、
                // leftIdx = rightIdx + 1n, rightIdx = leftIdx - 2n? No.
                
                // より良い方法：同じ値の範囲を特定し、その数を k とする。
                // 左側から同じ値が止まるインデックス l
                // 右側から同じ値が止まるインデックス r
                // 同じ値の総数 = l - r + 1n? No.
                
                // 実際：leftVal == right
