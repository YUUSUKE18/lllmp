import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        BigInteger target = new BigInteger(line1.trim());
        
        // 2 行目以降の整数を蓄えるリスト
        java.util.List<BigInteger> numbers = new java.util.ArrayList<>();
        int lineNum = 1; // すでに 1 行読み込んだので
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            try {
                BigInteger num = new BigInteger(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();
        
        // 2 つの数の和が目標値になるペアを数える
        // O(N^2) のアプローチを取るが、N が非常に大きすぎる場合はメモリ制限に引っかかる可能性がある。
        // ただし、問題文は「敵対的に大きな入力に対しても、実用的な時間とメモリで完了する」とある。
        // 通常、この種の問題では N が数万程度までなら O(N^2) は TLE になるが、
        // 値の分布によってはハッシュセットを使う O(N) の方が速いことが多い。
        // しかし、重複ペア（同じ値を持つ異なるインデックス）を正確に数える必要があるため、
        // 単純なハッシュマップでのカウントは「同じ値の組み合わせ」を過小評価する可能性があるか？
        // はい、例えば target=10, numbers=[5,5] の場合、5+5=10 なのでペアが 1 つある。
        // ハッシュセットで「seen」として処理する場合、「5」を見た時点で既に「seen」なので追加しない。
        // その際、すでに seen にある「5」と現在の「5」の組み合わせもカウントすべきか？
        // 問題文「位置が異なる 2 個」なので、インデックス (i, j) で i != j かつ numbers[i] + numbers[j] == target。
        // ハッシュセットを使う場合：
        // current = num; needed = target - num;
        // if (seen contains needed) { count += seen.get(needed); }
        // seen.add(current, 1);
        // この方法では、5 と 5 が come in order:
        // 1. i=0, num=5, needed=5. seen has no 5. seen add 5 -> {5:1}
        // 2. i=1, num=5, needed=5. seen has 5 (count 1). count += 1. total=1. seen add 5 -> {5:2}
        // これは正しい。
        // もし target=10, numbers=[5,6,4]
        // 1. i=0, num=5, needed=5. no. seen={5:1}
        // 2. i=1, num=6, needed=4. no. seen={5:1, 6:1}
        // 3. i=2, num=4, needed=6. yes, seen has 6 (count 1). count+=1. total=1. seen={5:1,6:1,4:1}
        // Correct.

        Set<BigInteger> seen = new HashSet<>();
        for (BigInteger num : numbers) {
            BigInteger needed = target.subtract(num);
            if (seen.contains(needed)) {
                count += seen.get(needed).intValueOrMaxInt(); // 注意: BigInteger なので int に変換する必要がある
            }
            BigInteger currentCount = seen.getOrDefault(num, BigInteger.ZERO);
            seen.put(num, currentCount.add(BigInteger.ONE));
        }

        System.out.println("pairs=" + count.longValue());
    }
}
