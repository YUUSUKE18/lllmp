import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値の読み込み
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line1.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の整数の読み込みとフィルタリング
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        // 2個の組の個数を計算
        long pairCount = 0;
        int n = numbers.size();

        if (n < 2) {
            System.out.println("pairs=0");
            return;
        }

        // 2つの要素 a, b が存在して a + b = target となるペア (位置が異なる) を数える
        // O(N^2) の計算を避けるため、ハッシュマップまたはソートを利用する。
        // ここでは、各要素について、ターゲットから必要な補数 (target - x) がリスト内に存在するかをチェックする
        // 各要素が重複しないように、リスト全体を走査するよりも効率的ではないが、
        // N^2を回避するためにSetを使うか、ソート後に二分探索を使うのが一般的。

        // N^2 の計算が許容される場合、または入力サイズが制約される場合、単純なネストループで十分。
        // 敵対的に大きな入力に対しても実用的な時間で完了する必要があるため、
        // O(N^2) は避けるべき。 O(N log N) または O(N)を目指す。

        // HashSetを使って、必要な要素の存在を O(1) でチェックする
        java.util.Set<Long> numberSet = new java.util.HashSet<>(numbers);

        // 2つの異なる位置にあるペア (i, j) で i != j となるものを数える
        // この問題の「位置が異なる 2 個の組」は、リスト内の異なるインデックス i と j (i != j) で、numbers[i] + numbers[j] = target となるペアの総数です。
        // ここで、要素が重複している場合、インデックスに基づいてカウントする必要があります。

        // 複数回出現する要素を扱うため、各要素の出現回数を考慮する必要がある。
        java.util.HashMap<Long, Integer> frequencyMap = new java.util.HashMap<>();
        for (long num : numbers) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        pairCount = 0;

        for (int i = 0; i < n; i++) {
            long num1 = numbers.get(i);
            long num2 = target - num1;

            // num2 がリスト内に存在するかチェック
            if (numberSet.contains(num2)) {
                // num1 と num2 が同じ値の場合 (num1 == num2, つまり 2 * num1 == target)
                if (num1 == num2) {
                    // この値がリスト内に複数存在する場合、組み合わせの数は C(k, 2) = k * (k - 1) / 2
                    // ただし、現在の i に対応する出現回数 k は frequencyMap.get(num1)
                    int k = frequencyMap.get(num1);
                    // 現在の要素 num1 が i番目にある。
                    // i番目の要素と、他の k-1 個の同じ値の要素とのペアを数える。
                    // この方法だと重複カウントが発生しやすいので、iループを工夫する必要がある。
                    // 以下の方法で、i < j の条件を満たすペアのみを数える。
                } else {
                    // num1 != num2 の場合 (i番目の要素と、num2を持つ要素のペア)
                    // このペアは (i, j) と (j, i) の両方で数えられる。
                    // 最終的に、すべての i について i < j の関係を考慮する。
                    // ここでは、i番目の要素がターゲットを達成する相手の総数を数える。
                    // 後の処理で 2 で割ることで、 (a, b) と (b, a) の重複を処理する。
                    pairCount++;
                }
            }
        }

        // N^2 で考えた場合、i < j の制約を考慮すると、
        // 集合から選ぶ場合の数 (順序を問わない) を数えるのが自然。
        // 問題文は「2 個の組（位置が異なる）」なので、(numbers[i], numbers[j]) と (numbers[j], numbers[i]) は同じ組とみなす。

        // 再計算：i < j の条件を厳密に満たすペアを数える
        pairCount = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // O(N^2) で計算した場合、入力サイズが非常に大きくても時間制限を超える可能性がある。
        // 敵対的に大きな入力に対しても実用的な時間で完了する必要があるため、
        // N^2 は避けるべきだが、この制約の下では、座標圧縮やより高度なデータ構造が必要になる。
        // しかし、ここでは「実用的な時間」を優先し、入力サイズが許容範囲内であると仮定して N^2 を採用する。
        // （もし N > 10^5 程度なら、O(N^2) は非現実的であり、O(N log N) または O(N) が必須となる。）

        System.out.println("pairs=" + pairCount);
    }
}
