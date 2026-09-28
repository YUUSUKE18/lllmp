import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        // 計算結果のメモ化 (メモ化テーブル)
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1を初期値として設定しても良いが、再帰的な計算で都度計算する方式でも良い
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合のみ計算
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                }
                // 現在のクエリの手数に加算
                if (n > 0) { // 1以上の整数のみを考慮
                    totalSteps += memo.getOrDefault(n, calculateSteps(n, memo));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * nが1になるまでの手数を再帰的に計算し、結果をメモ化する。
     * @param n 現在の数
     * @param memo メモ化マップ
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // nが奇数なら 3n+1
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
