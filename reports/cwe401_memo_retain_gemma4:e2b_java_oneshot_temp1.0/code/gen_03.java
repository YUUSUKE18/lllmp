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
                    // n=1 のときの手数は 0
                    // 1 は 1 から到達する過程なので、この値自体はスキップする。
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を再帰的に行う（または反復的に）
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化込み）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = calculateSteps(n / 2, memo) + 1;
        } else {
            // n が奇数なら 3n+1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
