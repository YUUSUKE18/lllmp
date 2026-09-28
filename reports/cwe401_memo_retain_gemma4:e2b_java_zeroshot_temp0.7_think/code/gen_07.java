import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化付き）。
     * @param n 開始値
     * @return 手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化チェック
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            nextN = n / 2;
        } else {
            // n が奇数なら 3n+1
            // オーバーフローの心配は64bit Longの範囲内では通常ないが、念のため
            // 3n+1 は非常に大きな値になりうるが、Collatz問題では通常この操作が繰り返されるため、
            // nが非常に大きい場合でも、最終的には1に向かうという性質を利用する。
            nextN = 3 * n + 1;
        }

        // 再帰呼び出しとメモ化
        long steps = 1 + calculateSteps(nextN);
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        
        // 標準入力からクエリを読み込む
        while ((line = br.readLine()) != null) {
            // 空行や空白のみの行を無視
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line.trim());
                
                // 1 以上の整数であることの確認
                if (n >= 1) {
                    // メモ化された計算を実行
                    totalSteps += calculateSteps(n);
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
