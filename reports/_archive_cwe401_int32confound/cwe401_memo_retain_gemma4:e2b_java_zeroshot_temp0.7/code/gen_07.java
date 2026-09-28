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
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: 1 に到達するまでの手数は 0
                    // ただし、ここでは n がスタート地点であり、1 に到達するまでの操作回数を数えるため、
                    // n が 1 の場合は既に到達しているため、操作回数は 0。
                    // 仕様: n が 1 のときの手数は 0 です。
                    long count = 0;
                    totalCount += count;
                    
                    // memo には、その数から 1 に到達するまでの手数を格納する
                    memo.put(n, count);
                    continue;
                }

                // メモ化された値があるかチェック
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的計算とメモ化
                // n が偶数なら n/2, 奇数なら 3n+1
                long result;
                if (n % 2 == 0) {
                    result = calculateAndMemoize(n / 2, memo, totalCount);
                } else {
                    result = calculateAndMemoize(3 * n + 1, memo, totalCount);
                }
                
                // ここでの計算は、n から 1 に到達するまでの手数を求める問題の解法に依存します。
                // 問題の意図を再解釈します:
                // クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。
                // これは通常、n が 1 になるまでのステップ数を求める問題です。

                // 再度、計算ロジックを修正します。
                // n が 1 のときの手数は 0。
                // n > 1 の場合:
                // n が偶数なら n/2 に遷移。
                // n が奇数なら 3n+1 に遷移。
                // この遷移を繰り返して 1 に到達するまでのステップ数を数える。

                // メモ化された値が計算結果を保持するように修正します。
                long steps = calculateSteps(n, memo);
                totalCount += steps;
                memo.put(n, steps);


            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を計算し、メモ化する。
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return n から 1 に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
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

        // 遷移先の値に対して再帰的に計算し、現在のステップ数を加算する
        long steps = 1 + calculateSteps((int) nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
