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
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(1L, 0L); // 1の場合は0なので明示的に保存しても良いが、計算過程で自然に処理される
                } else if (!memo.containsKey(n)) {
                    // 再帰的または反復的に計算し、メモ化する
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモがあれば加算する
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
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
