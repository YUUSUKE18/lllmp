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
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                
                if (n == 1) {
                    // n=1 のときの手数は 0
                    long steps = 0;
                    totalSteps += steps;
                    // memo.put(1, 0L); // 1への遷移は今回は特別に処理しない（1からの遷移は通常の手順に含める）
                } else {
                    // メモ化された値があればそれを使用
                    if (memo.containsKey(n)) {
                        long steps = memo.get(n);
                        totalSteps += steps;
                    } else {
                        // 再帰的に計算し、メモ化する
                        long steps = calculateSteps(n, memo);
                        totalSteps += steps;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * n が 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return n から 1 への手数
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
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }
}
