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
            // 空行や整数として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n が 1 のときの手数は 0
                    totalCount += 0;
                } else if (!memo.containsKey(n)) {
                    // 再帰またはメモ化を用いた計算
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモ化された結果を使用
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視 (仕様に基づき)
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n が 1 に到達するまでの手数を計算し、結果をメモ化する再帰関数。
     * @param n 現在の数
     * @param memo メモ化用のマップ
     * @return n から 1 に到達するまでの手数
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

        // 再帰的に次のステップの手数を計算し、現在のステップを加算する
        long steps = 1 + calculateSteps(nextN, memo);
        
        memo.put(n, steps);
        return steps;
    }
}
