import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) {
                    continue;
                }

                if (n == 1) {
                    // 1 のときの手数は 0
                    long steps = 0;
                    totalSteps += steps;
                    // メモ化は不要だが念のため
                    memo.put(n, steps);
                } else if (!memo.containsKey(n)) {
                    // 再帰的な計算とメモ化
                    long currentSteps = calculateSteps(n, memo);
                    memo.put(n, currentSteps);
                    totalSteps += currentSteps;
                } else {
                    // メモから取得
                    totalSteps += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化再帰）
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

        long steps;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            steps = calculateSteps(n / 2, memo) + 1;
        } else {
            // n が奇数なら 3n+1
            steps = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
