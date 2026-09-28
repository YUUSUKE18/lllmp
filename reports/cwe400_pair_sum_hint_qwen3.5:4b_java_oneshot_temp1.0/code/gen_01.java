```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        BigInteger target = new BigInteger(targetLine.trim());

        // 2 行目以降を読み取る。空行や解析不可な行はスキップ。
        // int は 64bit signed として扱うが、計算結果が超える可能性があるためBigIntegerを使用。
        // ただし入力の整数自体は 64bit 範囲とされるので、long での読み込みで十分だが
        // 足し算の結果を確認するため BigInteger を用いる（または long の範囲内なら最適化可能だが
        // 厳密に仕様通りであるため、大きな数でも計算できるクラスを使用する）。
        
        Set<BigInteger> numbers = new HashSet<>();
        int lineCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) break; // EOF
            
            line = line.trim();
            if (line.isEmpty()) continue;

            BigInteger num;
            try {
                // 問題文「整数として解釈できない行も無視」を考慮。
                // parseInt は解析不能な場合は例外を投げるため、そのまま試す。
                // Java にはBigInteger.parseIntがあるが、これは int のパースであるので注意。
                // BigInteger(String) で直接パースする。
                num = new BigInteger(line);
            } catch (NumberFormatException e) {
                continue;
            }

            lineCount++;
            numbers.add(num);
        }

        long count = 0;
        
        // 2 個の組の数を数える。
        // 位置が異なる 2 つの要素 x, y (x < y のようにソートして考えると重複なし) を足した値が target になるペアの数。
        // N が大きくなる可能性を考慮し、ハッシュマップを使って O(N^2) ではなく 
        // O(N log N) または O(N) のアルゴリズムが必要か検討する。
        // 単純な二重ループでは O(N^2) となるが、64bit 整数の範囲内での「実用的な時間とメモリ」を満たすためには
        // N が非常に大きくなることが想定される。その場合、ハッシュ表を使ってペアを検索する必要がある。

        Set<Long> longs = new HashSet<>(); // long には収まると仮定（問題文：値は 64bit）
        for (BigInteger b : numbers) {
            if (b.bitLength() > 64L || Math.abs(b.compareTo(new BigInteger(Long.MAX_VALUE.toString()))) > 0) {
                // 例外処理？問題文は「値も個数も 64bit の範囲に収まる」なので、入力は long として扱うべき。
            }
        }

        // 再考：入力値自体は 64bit とされているため、long で管理可能。
        // ただし、足す際に overflow が起きない保証がないが、問題文「値と個数はいずれも 64bit の範囲に収まる」
        // というのは結果（答え）が収まると解釈できるが、中間計算も溢れる可能性がある。
        // しかし、一般に这样的问题は BigInteger を使うのが安全だが、高速性が求められる場合 long での最適化が必要。
        // 今回は「敵対的に大きな入力に対しても実用的」とあるので、N が大きい場合のアルゴリズム（ハッシュ表）を使用する。
        
        // ハッシュ表を使って「target - num」が存在するかを調べる。
        // N^2 の検索は危険なので、一度入力の長さがわかっていれば最適化するが、ここで全要素を読み込み済みとする。

        Set<Long> seen = new HashSet<>(); // long として解析した数値を入れるセット
        int n = numbers.size();
        
        // BigInteger から long への変換は安全であると仮定（問題文より）。
        // ただし、BigInteger が long の範囲を超えている場合に変換エラーになるため、
        // BigInteger をそのまま保持し、target - num の検索を行う必要がある。
        Set<BigInteger> targetSet = new HashSet<>();

        for (BigInteger b : numbers) {
            BigInteger needed = target.subtract(b);
            if (targetSet.contains(needed)) {
                count++;
            }
            // 注意：ここは単体では重複ペアをカウントしませんが、
            // "位置が異なる 2 つの組" とあるので、同じ値でも位置（インデックス）が異なればペアとしてカウント。
            // しかし、ハッシュセットに保持すると同じ値に対するインデックスを区別できません。
            // そこで、ソートや重複処理が必要か、あるいはインデックスごとにチェックする必要がある。
            
            // もう一度考える：「位置が異なる 2 つの組」
            // つまり、索引 i と j (i != j) における pairs(i, j) を数える。
            // 値 A[i] + A[j] = target
            // 場合分け：
            // 1. A[i] == A[j] の場合: 同じ位置を除き残りの組み合わせ。
            //    例えば index {i, i+1} が同じ値なら、その組の数 = C(重複数, 2) になる。
            // 2. A[i] != A[j] の場合：そのペアのみ。

            // ハッシュセットで直接検索するよりも、まず入力数をソートして処理すると効率的か？
            // または長さが大きいならハッシュテーブルで count を保持すべきか？

            // 再定説: 
            // N が非常に大きければ O(N^2) は不可。
            // したがって、値を計算式として扱う方法が必要。
            
            // まず入力値の解析と保存。
            // BigInteger 系で管理し、targetSet で検索する手法は正しいが、重複値の組の数を正確に数える必要がある。
            
            // 修正されたアプローチ：
            // 1. 入力数をソート (降順)。
            // 2. 双連指針（二重ポインタ）またはハッシュテーブルで計算する。
            //    最も堅牢なのはソートした上で双連指針を使うこと。

            // 但し、ソートの複雑さよりも、N^2 は避けたいので、ハッシュテーブルに値を格納して count を上げるのが一般的だが、
            // 同じ値に対する個数を正確に数える必要があるため、以下のロジックで実装する：

            // ソート済みリストで処理（降順）
            // 左端と右端から近接したペアを探す。

        }

        // 以上は思考過程であるが、最終的に正しく書くコードを生成する。

        // コードの書き直し:
        // BigInteger のソートは複雑だが、long として仮定して long[] に変換して sort するのが現実的。
        // ただし、BigInteger を使う場合、Java のリストソートで扱えるが、パフォーマンスは長所になる。
        
        // ここでは、入力値を long[]" として管理し（問題文により 64bit 以内）、long[] をソートして双連指針を使うのが最適。

        List<BigInteger> list = new ArrayList<>();
        for (BigInteger b : numbers) {
            // BigInteger 配列への保存。
            list.add(b);
        }
        
        Collections.sort(list, Collections.reverseOrder()); // 降順ソート
        
        long pCount = 0;
        int left = 0;
        int right = list.size() - 1;

        while (left < right) {
            BigInteger sum = list.get(left).add(list.get(right));
            
            if (sum.equals(target)) {
                // このペアが合致した場合、重複値があるか？
                // 同じ値のペア数を正確に計算する。
                
                // left 側の値と右側と同じ値の場合の扱い。
                // 同じ値の場合、左端から countL 個、右端から countR 個として、重複ペアの数 = C(countL, 2) * ...? 
                // いや、単純に：同じ値 x + x = target なので、x を含むすべてのインデックス i,j 対 (i<j) で数える。
                
                BigInteger valLeft = list.get(left);
                int countSameLeft = 0;
                while (left < right && list.get(left).equals(valLeft)) {
                    countSameLeft++;
                    left++;
                }

                BigInteger valRight = list.get(right); // 同じ値か確認する？実は既に left が進んでいるので、valRight は同じ値とは限りない。
                // 実際、ソート後と同じ値の処理：
                // もし list[left] == list[right] の場合。
                
                // 修正：左端と右端が同じ値の場合のみ特殊処理が必要ではないか？
                // より一般的な実装：target - val を持つ要素数を調べる。
                
                // 双連指針の標準的な使い方:
                // while(left < right):
                //   if sum < target: left++
                //   else if sum > target: right--
                //   else (sum == target): 
                //      同じ値を含むインデックスをグループ化し、ペア数を増やす。
                
                // しかし、double pointer は単一のケースに対して O(1) ずつ処理するが、同じ値の多数ある場合のみ効率が落ちる。
                // その対策として、重複値の数を数えて C(k,2) を加算するのが正しい。

                int currentLeftIdx = left;
                while (currentLeftIdx < right && list.get(currentLeftIdx).equals(valLeft)) {
                    currentLeftIdx++;
                }
                
                int countL = currentLeftIdx - 1 + 1; // 左側で値 == valLeft の個数

                int currentRightIdx = right;
                while (currentRightIdx >= left && list.get(currentRightIdx).equals(valRight)) {
                    currentRightIdx--;
                }
                
                int countR = right - currentRightIdx + 1;

                // しかし、valLeft と valRight が異なる場合と等しい場合で処理が異なる。
                // もし valLeft == valRight の場合 (2 * val == target):
                //   左側インデックス i, j で A[i] = A[j] = val/2 となる。その場合は C(countL, 2) か？
                //   いや、left < right なので、valL と valR が等しい場合、A[left] + A[right] = target -> 2*A[left] = target.
                //   このとき、すべての同じ値のインデックス対 (i, j) で i<j を数える。
                //   つまり、C(countTotal, 2) となる。

                if (valLeft.equals(valRight)) {
                    int totalCount = countL;
                    pCount += (long)totalCount * (totalCount - 1) / 2;
                    // これらのインデックスすべてを除外するため left, right を進める。
                    left = currentLeftIdx; 
                    // right は？実は同じ値が右側にもあるため、right はそのままでも良いが、左側の処理で left が move した。
                } else {
                    // valL != valR の場合 (A[i] + A[j] = target, i < j)
                    // left と right に属するすべてのペアは一意か？
                    // ソート済みの場合、double pointer は一意の対を検出できるか。
                    // しかし、同じ値を持つインデックスがある場合、(i, j) pairs が増える可能性がある。
                    // より確実なのは、left 側と right 側の異なる値を扱うこと。
                    
                    // ここは少し複雑なので、以下の単純なアプローチを採用する:
                    // もし sum == target:
                    //   valL と valR が異なる場合: left++, right--. (ペア数 +1)
                    //   しかし、left 側には複数の同じ値があり、right 側にも複数ある場合がある。
                    //   その場合、valL と valR の間にある値を考慮する必要があるか？
                    //   ソート済みなので、valL が最小で valR が最大。
                    //   もし valL + valR = target, 且つ A[i] = valL, B[j] = valR (i <= left, j >= right)
                    //   では、すべての i in [oldLeft, newLeft], j in [newRight, oldRight] で成立するか？
                    //   ソートされているため、A[i] >= valL, B[j] <= valR は不可能（ソート順が逆なので）。
                    
                    // 正しい双連指針：
                    // left < right:
                    //   if sum == target:
                    //     同じ値のグループを抽出。
                    //     左側グループ L1, 右側グループ R1.
                    //     もし valL != valR: 全てのペア (i,j) が成立するか？
                    //       A[i] = valL, B[j] = valR -> sum = target. i < j は常に真（ソート順）.
                    //       なので、左側グループの全要素 * 右側グループの全要素を追加。
                    //     もし valL == valR: 
                    //       両方が同じ値。C(count, 2) を追加。
                    
                    // しかし、double pointer の構造は以下のように変形する必要がある：
                    int lStart = left;
                    while (lStart < right && list.get(lStart).equals(valLeft)) {
                        lStart++;
                    }
                    int lCount = lStart - left;

                    int rStart = right;
                    while (rStart >= left && list.get(rStart).equals(valRight)) {
                        rStart--;
                    }
                    int rCount = right - rStart;

                    if (valLeft.equals(valRight)) {
                        pCount += (long)lCount * (lCount - 1) / 2; // 同じ値の組のみ
                    } else {
                        // valL != valR の場合。
                        // ソートされているので、left <= lStart-1 と right >= rStart+1.
                        // lStart 以降は > valLeft, rStart 以前は < valRight? いや、ソート順が逆なので...
                        // 降順：valL >= others_left, valR <= others_right.
                        // しかし A[i] + A[j] = target.
                        // i < j のとき、A[i] >= A[j].
                        // なので valL == valR が真なら、valL + valR = 2*val = target -> val = target/2.
                        // もし valL != valR, valL > valR.
                        // この場合、A[lStart-1] + A[rStart+1] = target か？
                        // lCount * rCount を加算する。
                        
                        pCount += (long)lCount * rCount;
                    }

                    left = lStart - 1; // 左側の値がこれ以上あるか確認
                    right = rStart + 1; // 右側の値がこれ以上あるか確認
                }
                
            } else if (sum.compareTo(target) < 0) {
                // 足し算結果 < target. 降順なので、left 側を大きく（値を小さく）する。
                left++;
            } else {
                // sum > target. right 側を小さく（値を大きく）。
                right--;
