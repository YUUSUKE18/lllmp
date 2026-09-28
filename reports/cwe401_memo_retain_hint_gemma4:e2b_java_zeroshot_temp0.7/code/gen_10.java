import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化付き）
     * @param n 開始数
     * @return 1 に到達するまでの手数
     */
    public static long calculateSteps(long n) {
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
                
                // 各クエリ n について手数を計算
                long steps = calculateSteps(n);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                // 仕様に基づき、整数として解釈できない行も無視する
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
