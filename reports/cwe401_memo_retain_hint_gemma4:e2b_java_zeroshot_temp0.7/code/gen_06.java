import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 のときの手数は 0
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, count);
                    continue;
                }

                if (memo.containsKey(n)) {
                    // メモがあればそれを使用
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 再帰または反復計算（メモ化再帰/動的計画法）
                long count = calculateSteps(n, memo);
                totalCount += count;
                memo.put(n, count);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }

        // メモに存在すれば返す
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            nextN = n / 2;
        } else {
            // n が奇数なら 3n+1
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算し、現在のステップを加算する
        long steps = 1 + calculateSteps(nextN, memo);

        // メモに保存
        memo.put(n, steps);
        return steps;
    }
}
