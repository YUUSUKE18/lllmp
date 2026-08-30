import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        // メモ化のためのマップ
        Map<Long, Long> memo = new HashMap<>();
        long totalCount = 0;

        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;

            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) {
                    continue;
                }

                try {
                    long n = Long.parseLong(line);

                    if (n == 1) {
                        // n が 1 のときの手数は 0
                        totalCount += 0;
                        continue;
                    }

                    // メモ化された値の確認
                    if (memo.containsKey(n)) {
                        totalCount += memo.get(n);
                        continue;
                    }

                    // 計算の実行
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalCount += steps;

                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }
        } catch (IOException e) {
            // 入力エラーが発生した場合の処理（実運用では不要だが、堅牢性のために）
        }

        // 結果の出力
        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を再帰的/メモ化再帰的に計算する。
     * @param n 開始値
     * @param memo メモ化された結果のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }

        // 再帰呼び出し前にメモを確認
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

        // 再帰的に次のステップの手数を求める
        long steps = 1 + calculateSteps(nextN, memo);

        // メモに保存して返す
        memo.put(n, steps);
        return steps;
    }
}
