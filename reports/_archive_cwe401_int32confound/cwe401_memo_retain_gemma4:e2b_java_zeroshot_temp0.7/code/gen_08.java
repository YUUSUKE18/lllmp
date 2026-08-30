import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1, 0L); // 1の場合のメモ化は不要だが、念のため
                } else if (!memo.containsKey(n)) {
                    // 再帰または反復で計算
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
     * nが1になるまでの手数を計算する（メモ化を使用）
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

        long steps;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            steps = calculateSteps(n / 2, memo) + 1;
        } else {
            // nが奇数なら 3n+1
            steps = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
