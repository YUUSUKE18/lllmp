import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        // メモ化のためのマップ
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 空行や数値として解釈できない行は無視
                if (line.trim().isEmpty()) {
                    continue;
                }
                long n = Long.parseLong(line.trim());

                // 再帰的な計算とメモ化を使用して、1に到達するまでの手数を求める
                long steps = calculateSteps(n, memo);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * nが1に到達するまでの手数を計算する（メモ化付き）。
     * 操作: nが偶数なら n/2、奇数なら 3n+1
     * n=1 のときは 0 手数。
     * 
     * @param n 現在の数
     * @param memo メモ化マップ
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
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

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }
}
