import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化テーブル: 整数から1に到達するまでの手数を格納する
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * 与えられた数 n が 1 に到達するまでの手数を計算する。
     * メモ化を使用して計算を高速化する。
     *
     * @param n 計算対象の数
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化された結果があればそれを使用する
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        
        // n が偶数なら n/2
        if (n % 2 == 0) {
            result = 1 + calculateSteps(n / 2);
        } 
        // n が奇数なら 3n+1
        else {
            // 3n+1 は64bit整数に収まることを前提とする
            result = 1 + calculateSteps(3 * n + 1);
        }

        // 結果をメモ化して返す
        memo.put(n, result);
        return result;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から1行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視する
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                // 1以上の整数であることの確認
                if (n < 1) {
                    continue;
                }

                // 計算結果を求める
                // calculateSteps関数内でメモ化が行われる
                long steps = calculateSteps(n);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
