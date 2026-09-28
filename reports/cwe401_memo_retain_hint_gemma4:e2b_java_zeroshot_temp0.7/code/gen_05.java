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
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1はベースケースなので明示的に保存しなくても良いが、念のため
                } else if (!memo.containsKey(n)) {
                    // 再帰または動的計画法で計算
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    // メモがあれば加算
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
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
            // 奇数なら 3n + 1
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算し、現在のステップ数を加算する
        long steps = 1 + calculateSteps(nextN, memo);
        
        memo.put(n, steps);
        return steps;
    }
}
