import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数 (3n+1問題)
     * メモ化を使用して計算を高速化する。
     * @param n 初期値
     * @return 1 に到達するまでの手数
     */
    public static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        long steps = 0;

        while (current != 1) {
            if (current % 2 == 0) {
                // n が偶数なら n/2
                current = current / 2;
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // 計算過程で現れる値は64bitに収まるため、longで保持する。
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から一行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行をスキップ
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // 入力を long として解釈
                long n = Long.parseLong(line.trim());

                // 手数を計算し、合計に加算
                long steps = calculateSteps(n);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                // 仕様に従い、整数として解釈できない行は無視する。
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
