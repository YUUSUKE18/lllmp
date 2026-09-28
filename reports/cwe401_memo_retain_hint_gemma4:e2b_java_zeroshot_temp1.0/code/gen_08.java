import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * 変換操作を繰り返し、1に到達するまでの手数を計算する
     * @param n 開始数
     * @return 1に到達するまでの手数
     */
    public static long countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        long steps = 0;

        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                // 3n + 1
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;

        // 入力を一行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行または整数として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n >= 1) {
                    // 各クエリに対する手数を計算し、合計に加算する
                    totalSteps += countSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
