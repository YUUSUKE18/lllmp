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
                    // この問題の文脈では、nが1になったときの「操作回数」を問うていると解釈する。
                    // 1からスタートして1に到達するまでの操作回数を数える。
                    // 1 -> 0 (偶数なら n/2)
                    // 1 -> 3(1)+1 = 4 (奇数なら 3n+1)
                    // 4 -> 2
                    // 2 -> 1
                    // 1 に到達するまでの手数を求める。
                    // n=1 のときの手数は 0。
                    memo.put(n, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰またはメモ化再帰で計算
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                }
                
                // 各クエリについて、nから1に到達するまでの手数を合計する
                totalCount += memo.get(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1になるまでの手数を計算する（メモ化再帰）
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0L;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = calculateSteps(n / 2, memo) + 1;
        } else {
            // n が奇数なら 3n+1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
