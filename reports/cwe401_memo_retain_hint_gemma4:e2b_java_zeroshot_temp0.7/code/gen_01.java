import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long totalCount = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n が 1 のときの手数は 0
                    long count = 0;
                    totalCount += count;
                    // memo.put(n, count); // 1 の場合は 0
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を実行
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモ化されている場合、メモ化された値を使用
                    totalCount += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を再帰的メモ化で計算する
     * @param n 現在の数
     * @param memo メモ化のためのマップ
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
            // n が偶数なら n/2
            nextN = n / 2;
        } else {
            // n が奇数なら 3n+1
            nextN = 3 * n + 1;
        }

        // 再帰呼び出し
        long steps = 1 + calculateSteps(nextN, memo);

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }
}
