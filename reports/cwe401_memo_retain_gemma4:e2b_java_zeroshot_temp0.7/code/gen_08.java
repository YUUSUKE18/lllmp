import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(1L, 0L); // 1 のケースは特殊なのでここでは記録しないか、0として扱う
                    continue;
                }

                if (memo.containsKey(n)) {
                    // メモ化された値があればそれを使用
                    long count = memo.get(n);
                    totalCount += count;
                } else {
                    // 再帰的計算とメモ化
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を計算し、結果をメモ化する再帰関数。
     * @param n 現在の数
     * @param memo メモ化マップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰呼び出し
        long steps = 1 + calculateSteps(nextN, memo);

        // メモ化
        memo.put(n, steps);
        return steps;
    }
}
