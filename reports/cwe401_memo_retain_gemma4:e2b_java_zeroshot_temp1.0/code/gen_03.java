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
            // 空行の無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n=1 の場合は手数は 0
                    long count = 0;
                    totalCount += count;
                    continue;
                }

                if (!memo.containsKey(n)) {
                    // 再帰とメモ化を使って手数を計算
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモから取得
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
     * n から 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化用のマップ
     * @return 1 に到達するまでの手数
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

        memo.put(n, steps);
        return steps;
    }
}
