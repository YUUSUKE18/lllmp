import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) continue;

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(n, 0L); // 1のケースは特別扱い
                } else if (!memo.containsKey(n)) {
                    // 再帰的に計算し、メモ化
                    long result;
                    if (n % 2 == 0) {
                        result = calculate(n / 2, memo);
                    } else {
                        result = calculate(3 * n + 1, memo);
                    }
                    memo.put(n, result);
                }
                
                // n が入力された時点での計算結果を取得し、合計に加算
                long count;
                if (n == 1) {
                    count = 0;
                } else {
                    count = memo.get(n);
                }
                total += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * n から 1 に到達するまでの手数を計算する（再帰的、メモ化付き）
     * @param n 現在の数
     * @param memo メモ化用のマップ
     * @return 1 に到達するまでの手数
     */
    private static long calculate(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            result = calculate(n / 2, memo);
        } else {
            result = calculate(3 * n + 1, memo);
        }
        
        memo.put(n, result + 1);
        return result + 1;
    }
}
