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

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(n, 0L); // 1 は特殊ケースとして扱う
                } else if (!memo.containsKey(n)) {
                    // 再帰または動的計画法で計算
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalSteps += steps;
                } else {
                    totalSteps += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * n が 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1 に到達するまでの手数
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
            nextN = 3 * n + 1;
        }

        long steps = 1 + calculateSteps(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
