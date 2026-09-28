import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数（メモ化付き）
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
            // 空行や数値として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n >= 1) {
                    // n が 1 以上の整数であるという前提
                    long steps = countSteps(n);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
