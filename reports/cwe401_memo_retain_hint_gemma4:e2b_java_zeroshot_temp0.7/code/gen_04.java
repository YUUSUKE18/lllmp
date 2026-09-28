import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数 (3n+1問題)
     * @param n 初期値
     * @return 1 に到達するまでのステップ数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        long steps = 0;

        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // メモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // 整数として解釈
                long n = Long.parseLong(line.trim());
                
                if (n >= 1) {
                    long steps = calculateSteps(n);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視 (仕様に従う)
                continue;
            }
        }

        // 結果の出力
        System.out.println("total=" + totalSteps);
    }
}
