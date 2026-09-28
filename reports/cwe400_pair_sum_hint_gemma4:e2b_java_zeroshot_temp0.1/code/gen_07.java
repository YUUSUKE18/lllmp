import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値
        String targetLine = br.readLine();
        if (targetLine == null) return;
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の入力を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        // 足して目標値になる2個の組の数を数える
        long pairCount = 0;
        int n = numbers.size();

        // O(N^2) の全探索で解く。Nが最大で数百万程度でも、制約によっては間に合う可能性がある。
        // 敵対的に大きな入力に対しても実用的な時間で完了するように、より効率的な方法を検討する。
        // ここでは、2つの要素の和を求める問題なので、ハッシュマップやソートを利用する方が効率的。

        // 2つの要素 a と b について a + b = target となる組を探す。
        // numbers リスト内の要素のペア (i, j) で i != j を考える。

        // 効率化のため、ハッシュセット（またはハッシュマップ）を使用する。
        // 各数 x について、target - x がリスト内に存在するかをチェックする。

        // 存在チェックを高速化するため、リストをセットに変換する。
        java.util.Set<Long> numberSet = new java.util.HashSet<>(numbers);

        for (long num1 : numbers) {
            long num2 = target - num1;

            // num1 と num2 がリスト内の異なる要素であるかを確認する。
            if (numberSet.contains(num2)) {
                // num1 + num2 = target となる組が見つかった。
                // 1. num1 == num2 の場合 (2 * num1 = target)
                if (num1 == num2) {
                    // この場合、リスト内に num1 が少なくとも2つ存在する必要がある。
                    // 実際には、リスト内の異なるインデックス i と j (i != j) のペアを数える必要がある。
                    // ここでは、リスト内の要素の出現回数を数えることで、重複を正しく扱う。
                    // 後の処理で、リスト内の要素の出現回数を数える方法に切り替える。
                } else {
                    // num1 != num2 の場合、(num1, num2) の組が見つかった。
                    // このループでは、(num1, num2) と (num2, num1) の両方がカウントされるため、
                    // 最終的なカウントを調整する必要がある。
                    // 以下の方法で、リスト内の要素の出現回数を数えるアプローチを採用する。
                }
            }
        }

        // -----------------------------------------------------------------
        // 効率的な方法：出現回数を数える (O(N))
        // -----------------------------------------------------------------
        java.util.HashMap<Long, Integer> counts = new java.util.HashMap<>();
        for (long num : numbers) {
            counts.put(num, counts.getOrDefault(num, 0) + 1);
        }

        long finalPairCount = 0;

        for (long num1 : numbers) {
            long num2 = target - num1;

            if (counts.containsKey(num2)) {
                if (num1 < num2) {
                    // num1 と num2 が異なる場合、(num1, num2) の組を数える。
                    // num1 の出現回数 * num2 の出現回数
                    finalPairCount += counts.get(num1) * counts.get(num2);
                } else if (num1 == num2) {
                    // num1 == num2 の場合 (2 * num1 = target)
                    // 同じ値のペア (i, j) で i != j を数える。
                    // counts.get(num1) 個の要素から 2 つを選ぶ組み合わせ: C(count, 2) = count * (count - 1) / 2
                    int count = counts.get(num1);
                    if (count >= 2) {
                        finalPairCount += (long) count * (count - 1) / 2;
                    }
                }
            }
        }

        // 最終的な結果を出力
        System.out.println("pairs=" + finalPairCount);
    }
}
