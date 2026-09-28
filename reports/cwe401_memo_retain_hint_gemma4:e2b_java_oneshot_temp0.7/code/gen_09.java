import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // Base case: 1 に到達するまでの手数は 0
                    // ただし、これは個々のクエリの結果ではなく、この関数呼び出しの終了条件を表す
                    // 実際には、nが1になるまでのステップ数を計算する関数を考える必要がある。
                    // ここでは、nが1になるまでのステップ数を計算する関数を再帰的に定義する。
                    // 質問の意図は、各クエリ n について、操作を繰り返して 1 に到達するまでの手数を求めること。
                    // そして、その手数の合計を求めること。
                    // したがって、各クエリに対して、n -> 1 に到達するまでの操作回数を計算する必要がある。
                    // これは、Collatzの問題の逆操作（または、nから1へのパスの長さ）を求める問題である。
                    // ここでは、nから1へのパスを探索し、その長さを求める。

                    // 状態遷移:
                    // n が偶数なら n/2
                    // n が奇数なら 3n+1
                    // 1 に到達するまでのステップ数を求める。

                    // Memoizationを適用して、nから1へのステップ数を計算する
                    long steps = calculateSteps(n, memo);
                    totalSteps += steps;

                } else {
                    // n > 1 の場合、計算関数を呼び出す
                    long steps = calculateSteps(n, memo);
                    totalSteps += steps;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * n から 1 に到達するまでのステップ数を計算する（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return n から 1 へのステップ数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            // 3n + 1
            nextN = 3 * n + 1;
        }

        // 再帰呼び出しとメモ化
        long steps = 1 + calculateSteps(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
