import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        Set<Long> set = new HashSet<>();
        int count = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(line.trim());
                set.add(val);
                
                // 既にセットに存在する値の中で、target - val が存在するか確認
                // ただし、同じ値が複数回現れる場合でも、位置が異なる 2 つの組としてカウントされるため
                // 単純な Set では重複を区別できない。
                // 正解のアプローチ：配列またはリストで保持し、二重ループではなくハッシュマップで管理する。
                // しかし、O(N^2) は巨大な入力では TLE する可能性がある。
                // O(N) のアルゴリズムが必要。
                
                // 修正: ハッシュマップに {value -> count} を保持し、target - value が存在するか確認。
                // ただし、同じ値が複数回現れる場合、例えば target=10, val=3, val=7.
                // 最初の 3 を見たとき、7 がセットにあるか？いない。
                // 最初の 7 を見たとき、3 がセットにあるか？いる -> 1 組追加。
                // もし入力に 3, 7, 3 の順だった場合:
                // 1. val=3: set に 3 がない。set.add(3). count=0.
                // 2. val=7: set に 7 がない。set.add(7). count=0.
                // 3. val=3: set に 3 がある (target-3=7, 7 がセットにあるか？いる) -> count++. set.add(3).
                // これは正しい。ただし、同じ値が連続して現れた場合、例えば 3, 3, target=6.
                // 1. val=3: set に 3 がない。set.add(3).
                // 2. val=3: set に 3 がある (target-3=3, 3 がセットにあるか？いる) -> count++. set.add(3).
                // 結果は 1 組。これは正しい（位置が異なる 2 つ）。
                
                // 問題点: Set は重複を区別できないが、"位置が異なる" という条件を満たすかどうかは、
                // 同じ値が複数回現れても、その瞬間に target-val がセットにあるなら、
                // そのセット内の少なくとも 1 つの要素と現在の要素を組み立てられることを意味する。
                // ただし、target - val == val の場合（例: target=6, val=3）、
                // set に 3 が存在している限り、2 つの 3 を組み合わせることは可能か？
                // 入力: 3, 3. target=6.
                // 1. val=3. set.add(3).
                // 2. val=3. target-3=3. set に 3 があるか？ある。count++.
                // 結果は 1 組。これは正しい（位置 0 と位置 1 の 2 つの 3）。
                
                // しかし、上のロジックでは、set に要素を追加する前にチェックしている。
                // 入力: 3, 7. target=10.
                // 1. val=3. set に 3 がない。set.add(3).
                // 2. val=7. target-7=3. set に 3 があるか？ある。count++. set.add(7).
                // 結果は 1 組。正しい。
                
                // 入力: 7, 3. target=10.
                // 1. val=7. set に 7 がない。set.add(7).
                // 2. val=3. target-3=7. set に 7 があるか？ある。count++. set.add(3).
                // 結果は 1 組。正しい。
                
                // 入力: 3, 3, 3. target=6.
                // 1. val=3. set に 3 がない。set.add(3).
                // 2. val=3. target-3=3. set に 3 があるか？ある。count++. set.add(3).
                // 3. val=3. target-3=3. set に 3 があるか？ある。count++. set.add(3).
                // 結果は 2 組。正しい（(0,1), (0,2), (1,2) のうち、セット内の存在を基準としてチェックするとどうなるか？）
                // 上記のロジックでは:
                // 1. set={3}.
                // 2. val=3. target-3=3 in set? Yes. count=1. set={3,3} (Set は重複しないので {3}). -> ここが問題。
                // Set は重複を保持しないため、set.add(3) は常に成功しても内容が変わらない。
                // しかし、"位置が異なる 2 個の組" の数を数えるには、単純な Set では不十分かもしれない？
                // いや、Set に存在するか確認するだけで OK か？
                // 例: 3, 3, 3. target=6.
                // 組み合わせは (0,1), (0,2), (1,2) の 3 つ。
                // 上記のロジックでは count=2 になる。なぜなら、
                // 1. set={3}.
                // 2. val=3. 3 in set? Yes. count=1. set.add(3) -> set={3}.
                // 3. val=3. 3 in set? Yes. count=2. set.add(3) -> set={3}.
                // 実際には 3 つの組があるはず。Set の重複を保持できないため、このロジックは失敗する可能性がある。
                
                // 修正: 値ごとの出現回数をカウントする必要がある。
                // Map<Long, Integer> counts.
                // または、単に配列/リストで保持し、ハッシュマップで target-val の存在を確認するが、
                // 同じ値が複数回現れた場合の処理を考慮する。
                
                // 正しい O(N) アルゴリズム:
                // Map<Long, Long> counts; // value -> count of occurrences so far
                // long currentVal = ...;
                // long needed = target - currentVal;
                // if (counts.containsKey(needed)) {
                //     count += counts.get(needed);
                // }
                // counts.put(currentVal, counts.getOrDefault(currentVal, 0L) + 1);
                
                // 例: 3, 3, 3. target=6.
                // 1. val=3. needed=3. counts has 3? No. counts.put(3, 1).
                // 2. val=3. needed=3. counts has 3? Yes (1). count += 1 -> 1. counts.put(3, 2).
                // 3. val=3. needed=3. counts has 3? Yes (2). count += 2 -> 3. counts.put(3, 3).
                // 結果は 3。正しい。
                
                // 例: 3, 7. target=10.
                // 1. val=3. needed=7. No. put(3,1).
                // 2. val=7. needed=3. Yes (1). count+=1 -> 1. put(7,1).
                // 結果は 1。正しい。
                
                // 例: 7, 3. target=10.
                // 1. val=7. needed=3. No. put(7,1).
                // 2. val=3. needed=7. Yes (1). count+=1 -> 1. put(3,1).
                // 結果は 1。正しい。
                
                // 例: 3, 3, 7. target=6.
                // 1. val=3. needed=3. No. put(3,1).
                // 2. val=3. needed=3. Yes (1). count+=1 -> 1. put(3,2).
                // 3. val=7. needed=-1. No. put(7,1).
                // 結果は 1。正しい（(0,1) のみ）。
                
                // 例: 3, 3, 7. target=10.
                // 1. val=3. needed=7. No. put(3,1).
                // 2. val=3. needed=7. No. put(3,2).
                // 3. val=7. needed=3. Yes (2). count+=2 -> 2. put(7,1).
                // 結果は 2。正しい（(0,3), (1,3) のみ）。
                
                // このロジックで実装する。
                
                long needed = target - val;
                if (counts.containsKey(needed)) {
                    count += counts.get(needed);
                }
                counts.put(val, counts.getOrDefault(val, 0L) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
