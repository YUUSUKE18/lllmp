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

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    long steps = 0;
                    totalCount += steps;
                    continue;
                }

                // メモ化された値があるかチェック
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long steps;
                if (n % 2 == 0) {
                    // nが偶数なら n/2
                    steps = 1 + memo.get(n / 2);
                } else {
                    // nが奇数なら 3n+1
                    steps = 1 + memo.get(3 * n + 1);
                }
                
                // 再帰的な構造をメモ化するのではなく、本問の意図に従い、
                // 「nが1に到達するまでの手数」を求める問題として解釈し、
                // 各nについて直接計算し、その結果を合計する形で実装します。
                // ただし、仕様には「nが1に到達するまでの手数を求めます」とあるため、
                // これはCollatz数列のステップ数を求める問題です。

                // 再帰または反復でステップ数を計算し、メモ化するのが適切です。
                // ここでは、単にステップ数を計算し、それを合計します。
                
                // 再帰的な計算（メモ化付き）
                steps = calculateSteps(n, memo);
                
                if (steps > 0) { // nが1でなかった場合のみ合計に加算（n=1の場合は0ステップとして既に処理済みまたは後で処理される）
                    totalCount += steps;
                }

                memo.put(n, steps);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 最終的な合計を出力
        System.out.println("total=" + totalCount);
    }

    /**
     * nが1に到達するまでの手数を計算する（Collatz数列の手数）。
     * @param n 初期値
     * @param memo メモ化マップ
     * @return nが1に到達するまでのステップ数
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
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数と合計する
        long steps = 1 + calculateSteps(nextN, memo);
        
        memo.put(n, steps);
        return steps;
    }
}
