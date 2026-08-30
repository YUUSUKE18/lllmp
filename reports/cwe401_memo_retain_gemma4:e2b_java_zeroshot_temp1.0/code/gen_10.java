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
            // 空行や整数として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                
                if (n == 1) {
                    // nが1のときの手数は0
                    if (!memo.containsKey(1)) {
                        memo.put(1, 0L);
                    }
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、再帰的または反復的に計算
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                }
                
                // 求められた手数を合計に加算
                if (memo.containsKey(n)) {
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
     * nが1に到達するまでの手数を計算する関数（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化された結果を格納するマップ
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0L;
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
            steps = calculateSteps(3L * n + 1, memo) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
