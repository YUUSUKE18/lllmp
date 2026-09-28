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
                if (n < 1) continue; // 1 以上の整数のみを対象

                if (n == 1) {
                    // nが1のときの手数は0
                    long count = 0;
                    totalCount += count;
                    // メモ化は不要だが、念のため
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算と再帰（メモ化再帰）
                    long count = 1 + calculateSteps(n, memo);
                    totalCount += count;
                    memo.put(n, count);
                } else {
                    // メモ化されている場合
                    long count = memo.get(n);
                    totalCount += count;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1になるまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1に到達するまでの手数
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
            // nが偶数なら n/2
            result = 1 + calculateSteps(n / 2, memo);
        } else {
            // nが奇数なら 3n+1
            result = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result;
    }
}
