import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedLine);
                if (n == 1) {
                    // 1に到達するまでの手数は0
                    // memo.put(n, 0L); // 1は特別扱いだが、ここでは再帰的に計算されるためスキップ
                } else if (!memo.containsKey(n)) {
                    // 再帰またはメモ化再帰で手数を計算
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * nが1に到達するまでの手数を計算する。
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            result = calculateSteps(n / 2, memo) + 1;
        } else {
            // nが奇数なら 3n+1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
