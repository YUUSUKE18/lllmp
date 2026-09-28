import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数 (メモ化付き)
     * @param n 初期値
     * @return 1 に到達するまでの手数
     */
    private long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            steps = calculateSteps(n / 2) + 1;
        } else {
            // n が奇数なら 3n+1
            steps = calculateSteps(3 * n + 1) + 1;
        }

        memo.put(n, steps);
        return steps;
    }

    public void solve() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedLine);
                if (n <= 0) {
                    continue; // 1 以上の整数が与えられる
                }

                // 計算実行
                // 注: 仕様では「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
                // これは、与えられた n から開始して、操作を繰り返して 1 に到達するまでのステップ数を求めることを意味します。
                // 再帰的に計算するのではなく、この問題の構造（Collatz予想に類似）から、
                // 1 に到達するまでのパス長を求めることを再帰的に実装します。
                
                // ただし、仕様の解釈を再確認します。
                // 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
                // これは通常、初期値から1へのパス長を問うものです。

                // 既存のメモ化構造を再利用して、n から 1 へのパス長を計算します。
                long steps = calculateSteps(n);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    public static void main(String[] args) throws IOException {
        Main solver = new Main();
        solver.solve();
    }
}
