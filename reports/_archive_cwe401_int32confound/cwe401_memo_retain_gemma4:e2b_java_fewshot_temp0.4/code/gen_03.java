import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // 1に到達するまでの手数は0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // メモ化された値があればそれを使用
                    if (memo.containsKey(n)) {
                        long steps = memo.get(n);
                        total += steps;
                    } else {
                        // 再帰的計算とメモ化
                        long steps = calculateSteps(n, memo);
                        total += steps;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * nが1に到達するまでの手数を再帰的に計算し、メモ化する
     * @param n 現在の数
     * @param memo メモ化用のマップ
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
