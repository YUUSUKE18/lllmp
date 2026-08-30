import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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
                // 空行や数字として解釈できない行は無視する
                if (line.trim().isEmpty()) {
                    continue;
                }
                int n = Integer.parseInt(line.trim());

                if (n <= 0) {
                    continue;
                }

                // 再帰または反復処理で操作回数を計算し、メモ化する
                long steps = calculateSteps(n, memo);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1になるまでの操作回数を計算する（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化用のマップ
     * @return 1に到達するまでの手数
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
