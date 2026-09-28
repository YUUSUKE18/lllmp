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
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値のチェック
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算の実行とメモ化
                long steps = calculateSteps(n, memo);
                totalCount += steps;
                memo.put(n, steps);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1になるまでの手数を再帰的メモ化（動的計画法）で計算する。
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }

        // 再帰呼び出し前のメモ化チェック（メインループでもチェックされるが、再帰内で再チェック）
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            nextN = n / 2;
        } else {
            // nが奇数なら 3n+1
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算
        long steps = 1 + calculateSteps(nextN, memo);

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }
}
