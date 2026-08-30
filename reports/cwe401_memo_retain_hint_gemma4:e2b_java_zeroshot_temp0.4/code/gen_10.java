import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 開始数
     * @return 1 に到達するまでの手数
     */
    private static long countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = countSteps(n / 2) + 1;
        } else {
            // n が奇数なら 3n+1
            result = countSteps(3 * n + 1) + 1;
        }

        memo.put(n, result);
        return result;
    }

    public static void main(String[] args) throws IOException {
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

                // n が 1 以上であるか確認（仕様より）
                if (n < 1) {
                    continue;
                }

                // n が 1 の場合は手数は 0
                if (n == 1) {
                    totalSteps += 0;
                    continue;
                }

                // 計算実行
                // 注意: countSteps は再帰的に計算し、メモ化を利用して効率的に計算します。
                // 呼び出しごとに memo を共有します。
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
}
