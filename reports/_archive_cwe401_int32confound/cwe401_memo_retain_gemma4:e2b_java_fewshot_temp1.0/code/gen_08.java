import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n が 1 のときの手数は 0
                    // 既に memo に存在すればそれを採用
                    if (!memo.containsKey(n)) {
                        memo.put(n, 0L);
                    }
                    // 1 の場合、手数は 0 なので合計に加算
                    total += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    // メモがあればそれを使う
                    total += memo.get(n);
                    continue;
                }

                // 再帰的に計算し、メモ化する
                long result;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    result = calculate(n / 2, memo);
                } else {
                    // n が奇数なら 3n+1
                    result = calculate(3 * n + 1, memo);
                }

                // 再帰呼び出しの結果に現在のステップ数を加算してメモする
                memo.put(n, 1 + result);
                total += (1 + result);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * 必要な手数を再帰的に計算し、メモ化するヘルパー関数。
     * この問題では、元の仕様（nから1に到達するまでの手数）を直接求めるのではなく、
     * 各クエリの計算過程で累積する合計を求める必要があるため、
     * メモ化戦略を再考します。
     * 
     * 課題の要求は「各クエリの手数の合計」です。
     * 各クエリnに対して、nを操作して1に到達するまでのステップ数を求める必要があります。
     * この操作は、Collatz推移の逆操作に関する問題ですが、
     * 求められているのは単に「操作を繰り返した手数」です。
     * 
     * n -> n/2 (nが偶数) または n -> 3n+1 (nが奇数)
     * 
     * 通常、この種の「1に到達するまでの手数」は、nから開始して1に到達するまでのパスの長さとして計算されます。
     * ただし、与えられた操作は「遷移」であり、この遷移を逆算して1に戻るパスを考えるのが一般的です。
     *
     * ここでは、与えられた操作（nが偶数ならn/2、奇数なら3n+1）を適用し、1になるまでのステップ数を計算します。
     * 1に到達するまでのステップ数は、操作を繰り返したときのステップ数（遷移回数）を意味します。
     */
    private static long calculate(long n, Map<Long, Long> memo) {
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

        // 手数は現在のステップ + 次のステップからの手数
        long steps = 1 + calculate(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
