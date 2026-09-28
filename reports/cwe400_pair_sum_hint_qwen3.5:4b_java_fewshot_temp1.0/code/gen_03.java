```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        String line2 = "";
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        try {
            long target = Long.parseLong(line1.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        Set<Long> seen = new HashSet<>();
        long count = 0;
        while ((line2 = br.readLine()) != null) {
            if (line2.trim().isEmpty()) continue;
            try {
                long n = Long.parseLong(line2.trim());
                long complement = target - n;
                seen.add(n);
                Iterator<Long> it = seen.iterator();
                while (it.hasNext()) {
                    long prev = it.next();
                    if (prev != n) { // 自分自身と比較しない
                        if (target == prev + n) {
                            count++;
                            it.remove(); // 既にペアを組んだ要素をセットから削除し、重複防止と効率的さ向上のため（ただし問題文の「2個の組の個数」の定義による）
                            // ここで注意: "組の個数"という定義。
                            // A+B = target の場合、(A, B) と (B, A) は同一の組です。
                            // あるいは順序が重要か？通常「2個の組（位置が異なる）」は集合として{A,B}を指します。
                            // しかし、セット内の再確認ループを使えば (A,B) を発見した時点で B も存在するはずで、A と B が同一ではないことを担保できます。
                            // ただし、Set から要素を削除すると次のチェック時に A が再度比較されません（これは正しい）が、B がセットにあるかどうかを確認するのはもう一度スキャンする必要がありますか？
                            // より良い方法: Set に全ての数値を入れる前に、2倍の配列を作るのが簡単だがメモリコストが高い。
                            // 最適化: Set に入れているうちで、complement が存在するかチェックするが、それにはセットの中身を確認する必要がある。
                            // ここでは「組」を一意のものとして扱うため、A<B かつ A+B=target と見做すか、位置 indices を用いるか。
                            // 「位置が異なる 2 個」という条件なので、index i,j (i<j) で value[i]+value[j]=target.
                            // 今回の実装は: Set に数値を入れる順で、その数値 n が「既に存在する何か」の補完と一致するかを確認。
                            // しかし、Set の要素を直接スキャンするのは O(k^2)。
                            // 修正: 問題を再考。入力は 1行に1個ずつ整数（大規模）。2番以降の数値から target に達するペア数を数える。
                            // 効率の良い解法: 2重ループは悪いので、Set を使いながら「補完が存在するか」を O(1) で確認する必要があるが、Java の Set.get が存在する場合は true.
                            // 問題は、A+B=C (Cがtargetに等しい) の場合。
                            // ここでnに対して target-n が既にセットにあるかを確認します。もしあれば、そのpairが存在します。
                            // ただし、nと(target-n)を同じ数値として扱う場合は2回カウントされます。
                            // 例: target=10, numbers=[5, 5]. pair (idx0, idx1). n=5(第1個), complement=5(第0個). found. count++? 
                            // するとn=5(第2個)でもfound=trueになる？
                            // この場合、(idx0, idx1)は同じ値を持つが位置が違う。ペアを「組」として数えるか、「順序付きペア」か。
                            // 問題文: "組（位置が異なる2個）の個数" -> 通常 {A,B} と {B,A} は同一の組。
                            // したがって、セット内にある要素と現在入力した要素を比較し、補完が存在する場合カウント。ただし、現在のnと同じ補分が存在した場合もカウントするか？
                            // 例: T=10, nums=[5,5]. i=0,n=5, seen={}, found(5)? no. add 5. i=1,n=5, seen={5}, found(5)? yes (seen[5]==5). count++.
                            // 結果は1。正しい。(idx0, idx1).
                            // 例: T=12, nums=[6,6]. i=0,n=6. i=1,n=6. seen={6}. found(6)? yes (6+6=12). count++. 結果1。
                            // 例: T=11, nums=[5,6]. i=0,n=5. seen={5}. complement=6? no. add 5. i=1,n=6. complement=5? yes. count++.
                            // このロジックが正しいか確認。ただし、セットに要素を挿入する前に補完があるかチェックするのは効率的。
                            // しかし、Set.getは存在するか返すのみ。
                            // ただし、A+B=target のとき AとBが同じ値である場合（例: 6+6=12）、seenの中に6が存在している時にn=6が来るのでカウントされる。
                            // この場合、{6,6}というペアは有効か？位置が異なる2個。はい。
                            // 問題は「組の個数」をどのように数えるか。「A+B=target」を満たす {i,j} (i<j) の数。
                            // My logic: Iterate. If (target - n) exists in seen, it means we found a pair (seen_element, current_n). Since they are different indices, this forms exactly one valid pair (j < i). 
                            // However, if there are multiple occurrences of the same value?
                            // Example T=10, nums=[5, 5].
                            // i=0, n=5. complement=5. seen={}. not found. add 5. seen={5}.
                            // i=1, n=5. complement=5. found in seen (value 5). count++. 
                            // Here we have one pair (idx0, idx1). Correct.
                            // What if nums=[2,3,8]. T=10.
                            // 2: c=8. not in {}. add 2.
                            // 3: c=7. not in {2}. add 3.
                            // 8: c=2. found 2. count++. Pair (2,8). Correct.
                            // What if nums=[2,8,5]. T=10.
                            // 2: c=8. no. add 2.
                            // 8: c=2. yes. count++. Pair (2,8).
                            // 5: c=5. no. add 5.
                            // Total 1. Correct.
                            // What if nums=[3,7,3,7]. T=10.
                            // 3: c=7. no. add 3.
                            // 7: c=3. yes (found 3). count++. (3,7).
                            // 3: c=7. yes (found 7). count++. (7,3) -> Wait, this counts as another pair?
                            // Indices: 0:3, 1:7, 2:3, 3:7.
                            // Pairs with sum 10: (0,1), (0,3), (2,1), (2,3). Total 4 pairs.
                            // My logic trace:
                            // i=0, n=3. c=7. seen={}. add 3.
                            // i=1, n=7. c=3. found 3 in {3}? Yes. count++. (Pair indices 0,1). Remove? No removal needed if we just count. But wait, the set contains ALL previous elements.
                            // If I don't remove, i=2, n=3. c=7. found 7 in {3,7}? Yes. count++. (Pair indices 1,2).
                            // i=3, n=7. c=3. found 3 in {3,7,3}? Yes. count++. (Pair indices 0,3 and 2,3 are both counted here?). 
                            // The set contains duplicates? HashSet does not store duplicates!
                            // This is the problem. If I use a standard Set<Long>, [3,7,3,7] becomes {3,7}.
                            // Trace with Set:
                            // i=0, n=3. c=7. found 7 in {}? No. add 3. Set={3}.
                            // i=1, n=7. c=3. found 3 in {3}? Yes. count=1.
                            // i=2, n=3. c=7. found 7 in {3,7} (after adding 7)? 
                            //   Wait, the order is: check complement -> add current.
                            //   At i=1: n=7. seen={3}. found 3? Yes. count=1. Add 7. Set={3,7}.
                            //   At i=2: n=3. seen={3,7}. found 7? No, complement is 4? No T=10. 10-3=7. Found 7? Yes. count=2.
                            //   At i=3: n=7. seen={3,7}. found 3? Yes. count=3.
                            // Result: 3. But actual pairs are (0,1), (0,3), (1,2), (2,3). Total 4.
                            // So HashSet fails to count duplicate values correctly for "counting pairs". We need to track counts of each number? 
                            // Or better: iterate and store indices in a way that handles duplicates.
                            // Actually, the standard 2-sum problem with counting pairs usually involves sorting or a frequency map.
                            // Since input is stream, we can maintain a Map<Long, Integer> count of frequencies.
                            // But iterating through the Set logic above failed because it ignored duplicates in values.
                            // Correct Logic: Maintain counts of numbers seen so far.
                            // For current n:
                            //   complement = target - n
                            //   if complement exists in map:
                            //     count += (number of occurrences of complement) * 1? 
                            //     Wait, if we see n=3 (the second one), and we have seen {3,7} previously.
                            //     If complement is 7, we add count(7).
                            //     But here we need to pair the CURRENT index with ANY previous index.
                            //     So for each unique value v in map, if target - v exists, we add product of frequencies? 
                            //     That would count pairs (val1, val2) where val1 != val2 and val1+val2=target. Summing up all such pairs across the stream?
                            //     Yes. The problem asks for "number of pairs". If we have [3,7] -> 1 pair.
                            //     Add another 3: [3,7,3]. Pairs (idx0,idx1), (idx2,idx1). Total 2.
                            //     My Set logic gave 2? Wait, trace again.
                            //     Trace with Set:
                            //     i=0(3): c=7. map empty. add 3. Map={3}.
                            //     i=1(7): c=3. found 3 in {3}? Yes. count=1. add 7. Map={3,7}.
                            //     i=2(3): c=7. found 7 in {3,7}? Yes. count=2. add 3. Map={3,7} (set doesn't store dup).
                            //     i=3(7): c=3. found 3 in {3,7}? Yes. count=3.
                            //     Result 3. Actual is 4.
                            //     Why? Because the third '3' can pair with both previous '7's? 
                            //     Wait, [3,7,3,7]. Indices: 0:3, 1:7, 2:3, 3:7.
                            //     Pairs summing to 10: (0,1)=10, (0,3)=10, (2,1)=10, (2,3)=10. Total 4.
                            //     My Set logic failed because it treated all 3s as one entity and all 7s as one entity when updating the set? 
                            //     No, it checked existence. It missed that there were multiple instances of 3 to pair with a single 7? 
                            //     No, at step i=2 (n=3), we check if complement (7) exists. If yes, it means 'any' previous 7 can form a pair with current 3.
                            //     But how many such pairs? We need the count of complement.
                            //     So: use Map<Long, Long> counts instead of Set.
                            //     Algorithm:
                            //       Map<Long, Long> map = new HashMap<>();
                            //       long pairs = 0;
                            //       for n in numbers:
                            //         c = target - n
                            //         if map contains key c:
                            //           pairs += map.get(c) * ...? 
                            //           Wait, we are processing one by one. At step i, we form pairs with ANY j < i such that nums[i] + nums[j] == target.
                            //           If map stores the count of each number seen so far:
                            //             Let k = complement of n.
                            //             If k exists in map: 
                            //               pairs += map.get(k)   <-- This counts (k, n) for EACH occurrence of k before current n.
                            //             Wait, if we have multiple n's same value?
                            //             Case [3, 7, 3, 7].
                            //             i=0, n=3. c=7. map={}. pairs+=0. map.put(3,1).
                            //             i=1, n=7
