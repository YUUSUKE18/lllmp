import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(trimmedLine);

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1, 0L); // 必要に応じてメモ化
                } else if (!memo.containsKey(n)) {
                    // 再帰または動的計画法で計算
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                }

                // nが1でない場合の計算と合計の更新
                if (n != 1) {
                    // ここでは、各クエリ n に対して、1に到達するまでの手数を計算し、合計に加算する必要があります。
                    // 仕様を再確認すると、「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
                    // これは、単一の数 n から 1 への操作の回数を意味します。
                    // 通常、この問題形式では、与えられた n に対して 1 に到達するまでのステップ数を求めることになります。

                    // calculateStepsの結果を合計に加算
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を再帰的またはメモ化再帰で計算する関数。
     * @param n 開始数
     * @param memo メモ化用のマップ
     * @return 1 に到達するまでの操作回数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
