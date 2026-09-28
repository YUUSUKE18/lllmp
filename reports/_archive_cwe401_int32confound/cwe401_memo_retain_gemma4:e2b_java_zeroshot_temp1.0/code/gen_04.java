import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            // 空行のスキップ
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                
                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(n, 0L); // 1は特例なので保存しないか、0で保存
                } else if (!memo.containsKey(n)) {
                    // 計算が必要な場合
                    long count = solve(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモがあれば加算する
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
     * nが1になるまでの手数を再帰とメモ化で計算する
     * @param n 現在の数
     * @param memo メモ化された結果のマップ
     * @return 1に到達するまでの手数
     */
    private static long solve(int n, Map<Integer, Long> memo) {
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
