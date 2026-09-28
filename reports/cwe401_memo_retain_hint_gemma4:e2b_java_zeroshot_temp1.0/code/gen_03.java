import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数。
     * メモ化を使用して計算時間を高速化する。
     *
     * @param n 初期値
     * @return 1 に到達するまでの手数
     */
    public static long countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            steps = countSteps(n / 2) + 1;
        } else {
            // n が奇数なら 3n+1
            steps = countSteps(3 * n + 1) + 1;
        }

        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から1行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // 入力を long 型として解釈
                long n = Long.parseLong(line.trim());

                if (n >= 1) {
                    // 各クエリに対する手数を計算
                    // 再帰呼び出しではなく、メモ化された構造を利用するために、
                    // 計算の呼び出し方を少し変更する。
                    // この問題は「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める」
                    // という定義なので、これは通常のCollatz予想のステップ数計算に類似しているが、
                    // 置き換え操作の定義が「1 に到達するまでの手数」なので、その過程を追う。
                    // 
                    // 注意: 通常のCollatz問題は「nを3n+1またはn/2で操作し、1に到達するまで」の手数を数える。
                    // ここで問われているのは「操作を繰り返す」操作の回数である。

                    // 再帰的なメモ化を再構成する（これはCollatzステップ数の計算と等価）
                    long currentN = n;
                    long count = 0;
                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        count++;
                    }
                    
                    totalSteps += count;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果の出力
        System.out.println("total=" + totalSteps);
    }
}
