import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 空行や数値でない行は無視
                if (line.trim().isEmpty()) continue;
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 の場合は手数は 0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的な計算とメモ化
                // 偶数なら n/2, 奇数なら 3n+1
                long count;
                if (n % 2 == 0) {
                    count = calculate(n / 2, memo);
                } else {
                    count = calculate(3 * n + 1, memo);
                }

                // 現在のnに対する計算結果をメモ
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n が 1 に到達するまでの手数を計算する（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1 に到達するまでの手数
     */
    private static long calculate(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            result = calculate(n / 2, memo);
        } else {
            result = calculate(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result + 1;
    }
}
