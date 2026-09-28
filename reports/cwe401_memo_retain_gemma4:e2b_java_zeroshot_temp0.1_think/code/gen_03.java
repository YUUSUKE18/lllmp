import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。キー: 開始数, 値: 1に到達するまでの手数
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 開始数
     * @return 手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = 1 + calculateSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            // 3n+1 は 64bit の範囲に収まることを前提とする
            result = 1 + calculateSteps(3 * n + 1);
        }

        // 結果をメモ化
        memo.put(n, result);
        return result;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力からデータを読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から1行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視する
            try {
                // 行を整数としてパースする
                long n = Long.parseLong(line.trim());
                
                // 1以上の整数であるか確認
                if (n >= 1) {
                    // メモ化された関数を使って手数を計算し、合計に加算する
                    // calculateSteps関数内で再帰的にメモ化が行われる
                    totalSteps += calculateSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を標準出力に出力
        System.out.println("total=" + totalSteps);
    }
}
