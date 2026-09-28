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
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                
                if (n == 1) {
                    // n=1 のときは手数は 0
                    long count = 0;
                    totalCount += count;
                    // memo.put(n, count); // 1のケースは0なのでメモ化しても良いが、ここではクエリごとに計算する
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を実行
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモ化されている場合、メモ化された値を加算
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
     * n から 1 に到達するまでの手数を再帰的メモ化で計算する。
     * @param n 開始値
     * @param memo メモ化用のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
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
