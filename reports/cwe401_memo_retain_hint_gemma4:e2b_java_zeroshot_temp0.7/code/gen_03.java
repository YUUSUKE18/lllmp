import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ
    private Map<Long, Long> memo = new HashMap<>();

    /**
     * 与えられた数 n から 1 に到達するまでの手数を計算する再帰関数（メモ化付き）
     * @param n 開始数
     * @return 1 に到達するまでの手数
     */
    private long countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = countSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            result = countSteps(3 * n + 1);
        }

        // メモ化
        memo.put(n, 1 + result);
        return 1 + result;
    }

    public void solve() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0) {
                    // 仕様では1以上の整数が与えられるが、念のため
                    continue;
                }
                
                // 計算実行
                // 注意: 再帰呼び出しが深くなりすぎたり、3n+1が非常に大きな数になったりする可能性があるため、
                // 非常に大きな入力に対しては、再帰ではなく反復的なメモ化探索（またはより高度な最適化）が必要になる場合があるが、
                // この問題はCollatz予想に関連しており、多くの場合、メモ化再帰で十分高速化される。
                // ここでは、与えられた仕様に従い、メモ化再帰を適用する。
                long steps = countSteps(n);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果の出力
        System.out.println("total=" + totalSteps);
    }

    public static void main(String[] args) {
        try {
            Main solution = new Main();
            solution.solve();
        } catch (IOException e) {
            // エラー処理（通常は競技プログラミングでは無視されることが多い）
        }
    }
}
