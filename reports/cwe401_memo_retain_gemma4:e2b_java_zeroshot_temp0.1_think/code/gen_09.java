import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * Collatz操作の手数（1に到達するまでのステップ数）を計算する。
     * メモ化を利用して計算を高速化する。
     * @param n 開始数
     * @return 1に到達するまでのステップ数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        long steps = 0;

        // 1に到達するまで繰り返す
        while (current != 1) {
            if (current % 2 == 0) {
                // n が偶数なら n/2
                current /= 2;
            } else {
                // n が奇数なら 3n+1
                // 64bitの範囲に収まることを前提とする
                current = 3 * current + 1;
            }
            steps++;
        }

        // 結果をメモ化して返す
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から整数を読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視する
            try {
                long n = Long.parseLong(line.trim());
                if (n >= 1) {
                    // 各クエリについて手数を計算し、合計に加算する
                    totalSteps += calculateSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
