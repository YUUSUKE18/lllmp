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
            // 空行の無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を実行
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // すべてのクエリの手数の合計を計算
        // 入力された行がクエリの順序であると仮定し、それらの結果を合計する
        // ただし、問題文の「すべてのクエリの手数の合計を求めます」は、入力された各数に対する操作の回数を指す。
        // ここでは、入力された各数 n について、1に到達するまでの手数を合計する。
        // 入力された数 n がクエリであるため、memo に格納されている値を使用する。
        // もし、入力された数 n がクエリの「開始値」であり、その操作の回数を求めるのであれば、
        // 実際には入力された各 n に対して calculateSteps(n, memo) を実行し合計する。
        // 仕様を再解釈すると、「入力された各数 n について、n から 1 に到達するまでの手数を求め、その合計を求める」と解釈するのが自然。

        // 再度、入力された各数 n について計算し、合計を求める処理を、入力処理と統合する。
        // 最初のループでは、memo には計算結果が格納されている。
        // ここで、入力されたすべての数 n について、その結果を合計する。
        // ただし、入力された数 n が、操作の開始値であるため、memo に格納されている値がその答えとなる。

        // 最初のループで、入力された各数 n に対して計算を行い、memo に格納した値がそのクエリの答えとなる。
        // したがって、memo の全要素の合計が求める合計となる。

        for (long count : memo.values()) {
            totalCount += count;
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を再帰的・メモ化再帰的に計算する。
     * @param n 開始値
     * @param memo メモ化テーブル
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0L;
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
