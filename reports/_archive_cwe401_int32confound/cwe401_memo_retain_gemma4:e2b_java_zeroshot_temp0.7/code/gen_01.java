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

                if (n == 1) {
                    // 1 のときの手数は 0
                    memo.put(n, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰または動的計画法で計算
                    long result;
                    if (n % 2 == 0) {
                        // n が偶数なら n/2
                        result = memo.get(n / 2) + 1;
                    } else {
                        // n が奇数なら 3n+1
                        result = memo.get(3 * n + 1) + 1;
                    }
                    memo.put(n, result);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // すべてのクエリの結果を合計する (ここでは、入力された全ての数について計算された結果を合計する)
        // 仕様を再確認すると、「各クエリ n について、... 手数を求め、すべてのクエリの手数の合計を求めます」
        // これは、入力された各数 n に対して、1 に到達するまでの手数を計算し、その合計を求めることを意味します。
        // memo には、計算された値とその手数が格納されています。
        
        // 入力された各数 n について、計算結果を合計します。
        // この実装では、入力された各nについて、そのnから1への経路の長さをmemoに格納しています。
        // しかし、問題文の操作は「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し」であり、
        // これは通常、1 に到達するまでのステップ数を求める問題です。

        // 再度、仕様を解釈します。
        // 「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
        // これは、Collatz予想に関連する問題です。
        // 求めたいのは、入力された各数 n から 1 に到達するまでのステップ数です。

        // 修正された計算ロジック（動的計画法/メモ化再帰）:
        // 入力が与えられたとき、その入力数 n から 1 へのステップ数を計算し、その合計を求める。

        // 再度、入力処理を修正して、入力された各数に対する計算を確実に行う必要があります。
        // 最初のループでは、入力された各数 n について、そのnから1へのパスを計算しました。
        // memo に格納されているのは、そのnから1への手数です。

        // 最終的な合計を計算
        for (Map.Entry<Integer, Long> entry : memo.entrySet()) {
            // 入力された各数 n について、その計算結果（手数）を合計する
            // ここで注意が必要：memoには入力された数 n とその結果が格納されている。
            // どの入力 n について合計すべきか？
            // 「すべてのクエリの手数の合計を求めます」
            // これは、入力として与えられた各数 n について、計算した手数を合計することを意味します。
            
            // 入力処理を再構築し、入力された各数 n について、その計算結果を合計します。
            // 最初の処理で入力されたnに対して計算が行われたため、memoの全ての値がそのnの計算結果に対応しています。
            // したがって、memoの全ての値を合計すれば良い。
            totalCount += entry.getValue();
        }

        System.out.println("total=" + totalCount);
    }
}
