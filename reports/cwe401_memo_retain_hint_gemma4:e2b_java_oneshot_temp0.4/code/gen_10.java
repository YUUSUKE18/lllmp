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
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 敵対的に大きな入力に対応するため、再帰とメモ化を利用する
                long count;
                if (n % 2 == 0) {
                    count = 1 + memo.get(n / 2);
                } else {
                    count = 1 + memo.get(3 * n + 1);
                }

                // 再帰的に呼び出す（メモ化を更新しながら）
                // ここでは、直接再帰で計算し、途中の値もメモ化するアプローチを取る。
                // ただし、問題の要求は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」なので、
                // 各クエリに対して独立に計算し、その結果を合計する形が自然。
                // 繰り返し操作の結果を求めるため、再帰的な構造をメモ化で最適化する。

                // 修正: 問題の意図は、与えられた n から 1 に到達するまでのステップ数を求めること。
                // 各クエリ n について、その計算過程を追跡し、合計する。

                // 繰り返し操作のステップ数を求める処理を再定義する。
                // 1回のクエリ n に対し、n -> f(n) -> f(f(n)) -> ... -> 1 に到達するまでのステップ数を求める。
                // このステップ数を求めるために、各クエリに対して個別に計算する。

                long steps = 0;
                long current = n;
                // 各クエリ n について、n から 1 に到達するまでのステップ数を計算する
                // ここで、n が与えられたときの「操作の回数」を数える。
                // ただし、問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
                // 1回の操作で1ステップと見なすのが一般的。

                // メモ化を適用するため、再帰的にステップ数を計算する。
                // ただし、メモ化は「n から 1 に到達するまでのステップ数」を格納する。

                // 再帰的な計算とメモ化の適用
                // 1回のクエリ n に対し、n から 1 に到達するまでのステップ数を求める。
                // 実際には、n が与えられたとき、その n が属する数列の性質を調べる問題（コラッツ予想に関連）であり、
                // ここで求められているのは、その数列の「長さ」または「到達回数」である。

                // 課題の解釈を「n が与えられたとき、n から 1 に到達するまでの操作の総回数」とする。
                // 1回の操作で1ステップとする。

                // 繰り返し操作のステップ数を求めるための再帰的メモ化
                long stepsForN = calculateSteps(n, memo);
                totalCount += stepsForN;
                memo.put(n, stepsForN);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの操作のステップ数を計算する（メモ化付き）。
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return n から 1 に到達するまでのステップ数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2 に置き換える操作
            result = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数なら 3n+1 に置き換える操作
            result = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result;
    }
}
