import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 のときの手数は 0
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // 3n+1 または n/2 の操作を繰り返す
                long currentN = n;
                long steps = 0;
                
                // 計算結果をメモ化するために、再帰的な構造を避けるためループで追跡する。
                // この問題は「nが1になるまでの手数を求める」であり、操作の順序に依存し、
                // 貪欲法や動的計画法（メモ化再帰）が適切。
                // 1に到達するまでの手数を求める問題は、通常、操作の順序が任意であるか、
                // あるいは「ある特定の操作のみ」を繰り返す問題として解かれますが、
                // ここでは「nが1になるまでの最短手数」を求めるため、再帰とメモ化を使用します。

                // しかし、問題文の操作は「nが偶数なら n/2、奇数なら 3n+1」と定められており、
                // これを繰り返し適用して1に到達するまでの手数を求める、という構造です。
                // これは通常、Collatz予想に関連する問題ですが、ここでは「1に到達するまでのステップ数」を問われています。
                
                // 操作のルールを再確認:
                // n が偶数なら n/2
                // n が奇数なら 3n+1
                // 1 のときの手数は 0。

                // ここで、元の問題文の操作が「nが偶数なら n/2、奇数なら 3n+1」であると仮定し、
                // この操作を繰り返し適用して1に到達するまでのステップ数を求める、という標準的なCollatzステップ数を求める問題として解釈します。

                // memo化された値がない場合、再帰で計算し、途中の値をメモ化します。
                
                // ここでは、nが1になるまでのステップ数を求めるため、再帰的に計算します。
                long result = calculateSteps(n, memo);
                
                if (result != -1) {
                    memo.put(n, result);
                    totalSteps += result;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * nが1になるまでの手数を計算し、メモ化する再帰関数 (メモ化再帰)
     * @param n 現在の数
     * @param memo メモ化用のマップ
     * @return nが1になるまでのステップ数。到達不能な場合は -1 (ここでは発生しないはず)
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
            // 3n + 1
            nextN = 3 * n + 1;
        }

        // 再帰呼び出しとステップ数の合計
        long steps = 1 + calculateSteps(nextN, memo);
        
        memo.put(n, steps);
        return steps;
    }
}
