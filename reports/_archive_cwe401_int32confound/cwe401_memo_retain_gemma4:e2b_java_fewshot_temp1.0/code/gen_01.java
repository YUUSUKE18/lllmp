import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;
        // 計算結果のメモ化を格納するマップ
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue; // 1以上の整数のみを対象とする

                if (n == 1) {
                    // n=1 のときの手数は 0
                    long count = 0;
                    totalSum += count;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalSum += count;
                    continue;
                }

                // 再帰/動的計画法による計算とメモ化
                long count;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    count = count(n / 2);
                } else {
                    // n が奇数なら 3n+1
                    count = count(3 * n + 1);
                }

                // 現在のnに対する計算結果をメモ化
                memo.put(n, count);
                totalSum += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 最終結果を出力
        System.out.println("total=" + totalSum);
    }

    /**
     * 階乗計算の結果をメモ化する再帰ヘルパー関数
     * @param n 現在の数
     * @return 1に到達するまでの手数
     */
    private static long count(int n) {
        if (n == 1) {
            return 0;
        }
        // この再帰呼び出し内で、すでにmemoに値が存在するかどうかをチェックする
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = count(n / 2);
        } else {
            // n が奇数なら 3n+1
            result = count(3 * n + 1);
        }

        // 計算結果をメモ化
        memo.put(n, result);
        return result;
    }
}
