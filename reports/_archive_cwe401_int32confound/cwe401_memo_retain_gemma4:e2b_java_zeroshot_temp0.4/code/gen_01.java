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
            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // n=1 のときの手数は 0
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // 再帰または反復で計算
                    long count = calculateSteps(n, memo);
                    totalCount += count;
                    memo.put(n, count);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1 に到達するまでの手数
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
            steps = calculateSteps(n / 2, memo) + 1;
        } else {
            // n が奇数なら 3n+1
            steps = calculateSteps(3 * n + 1, memo) + 1;
        }

        // メモ化
        memo.put(n, steps);
        return steps;
    }
}
