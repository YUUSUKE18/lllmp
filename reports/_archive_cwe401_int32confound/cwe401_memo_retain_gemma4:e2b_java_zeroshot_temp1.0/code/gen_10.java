import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) {
                    continue;
                }

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1, 0L); // 1からスタートするクエリがある場合のために記録しても良いが、今回は直接計算する
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的または反復的に計算
                long count = calculateSteps(n, memo);
                totalCount += count;
                memo.put(n, count);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1に到達するまでの手数を計算する（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
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
