import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // 再帰またはメモ化再帰で計算
                    long steps = calculateSteps(n, memo);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * n が 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化テーブル
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
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
