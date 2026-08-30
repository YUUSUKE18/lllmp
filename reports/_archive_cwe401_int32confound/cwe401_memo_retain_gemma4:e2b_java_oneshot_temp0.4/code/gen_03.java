import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) continue;

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // 再帰的に計算し、メモ化
                    long count = 1 + calculateSteps(n, memo);
                    memo.put(n, count);
                } else {
                    // メモから取得
                    long count = memo.get(n);
                }
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n が 1 に到達するまでの手数を計算する（メモ化付き）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            result = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result;
    }
}
