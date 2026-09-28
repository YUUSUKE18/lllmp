import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0) continue; // 1以上の整数が与えられる前提だが念のため
                
                long count = solve(n, memo);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1になるまでの手数を計算し、メモ化する再帰関数。
     * @param n 現在の数
     * @param memo メモ化のためのマップ
     * @return 1に到達するまでの手数
     */
    private static long solve(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            result = solve(n / 2, memo) + 1;
        } else {
            // nが奇数なら 3n+1
            result = solve(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
