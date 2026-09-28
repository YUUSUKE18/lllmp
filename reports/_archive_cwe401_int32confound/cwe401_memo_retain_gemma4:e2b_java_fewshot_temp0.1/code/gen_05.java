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
                    // n=1 のときの手数は 0
                    long count = 0;
                    total += count;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 再帰または動的計画法で計算
                long count;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    count = countFor(n / 2, memo);
                } else {
                    // n が奇数なら 3n+1
                    count = countFor(3 * n + 1, memo);
                }

                // メモに保存して合計に加算
                memo.put(n, count);
                total += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * n が 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1 に到達するまでの手数
     */
    private static long countFor(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = countFor(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            result = countFor(3 * n + 1, memo);
        }

        memo.put(n, result + 1);
        return result + 1;
    }
}
