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
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰または動的計画法で計算
                long count;
                if (n % 2 == 0) {
                    // nが偶数なら n/2
                    count = countFor(n / 2, memo);
                } else {
                    // nが奇数なら 3n+1
                    count = countFor(3 * n + 1, memo);
                }

                // 結果をメモ化し、合計に加算
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1になるまでの手数を計算する再帰関数（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1に到達するまでの手数
     */
    private static long countFor(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            result = countFor(n / 2, memo);
        } else {
            // nが奇数なら 3n+1
            result = countFor(3 * n + 1, memo);
        }

        memo.put(n, result + 1);
        return result + 1;
    }
}
