import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalMoves = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalMoves += memo.get(n);
                    continue;
                }

                // 計算の実行とメモ化
                long moves = calculateMoves(n, memo);
                memo.put(n, moves);
                totalMoves += moves;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalMoves);
    }

    /**
     * n から 1 に到達するまでの手数を再帰的または動的計画法で計算する。
     * Memoization を使用する。
     * @param n 初期値
     * @param memo メモ化用のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateMoves(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long moves;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            moves = calculateMoves(n / 2, memo) + 1;
        } else {
            // n が奇数なら 3n+1
            moves = calculateMoves(3 * n + 1, memo) + 1;
        }

        memo.put(n, moves);
        return moves;
    }
}
