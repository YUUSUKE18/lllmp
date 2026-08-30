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

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue; // 1以上の整数が与えられるため、念のためチェック
                
                if (n == 1) {
                    // nが1のときの手数は0
                    total += 0;
                } else if (!memo.containsKey(n)) {
                    // 再帰的計算とメモ化
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    total += steps;
                } else {
                    // メモがあればそれを使用
                    total += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * nが1になるまでの手数を計算する関数（メモ化再帰）
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
