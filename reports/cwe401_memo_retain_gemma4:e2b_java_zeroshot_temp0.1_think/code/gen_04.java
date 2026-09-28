import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。キー: 元の数, 値: 1に到達するまでの手数
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * 与えられた数 n が 1 に到達するまでの手数を計算する。
     * メモ化を利用する。
     * @param n 開始数
     * @return 手数
     */
    private static long countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        // 1に到達するまでのステップ数をカウント
        long steps = 0;
        while (current != 1) {
            if (current % 2 == 0) {
                // n が偶数なら n/2
                current /= 2;
            } else {
                // n が奇数なら 3n+1
                // 3n+1 は 64bit の範囲に収まることを前提とする
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
        long totalSum = 0;

        String line;
        // 入力ストリームから整数を読み込む
        while ((line = br.readLine()) != null) {
            // 空行や数値として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                // 1以上の整数であるという前提
                if (n >= 1) {
                    // 手数を計算し、合計に加算
                    long steps = countSteps(n);
                    totalSum += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSum);
    }
}
