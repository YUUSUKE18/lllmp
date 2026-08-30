import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰/動的計画法で計算
                long steps;
                if (n % 2 == 0) {
                    steps = calculateSteps(n / 2);
                } else {
                    steps = calculateSteps(3 * n + 1);
                }

                // メモに保存し、合計に加算
                memo.put(n, steps + 1);
                totalCount += (steps + 1);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = calculateSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            result = calculateSteps(3 * n + 1);
        }

        // 現在のステップを考慮して結果を返す
        memo.put(n, result + 1);
        return result + 1;
    }
}
