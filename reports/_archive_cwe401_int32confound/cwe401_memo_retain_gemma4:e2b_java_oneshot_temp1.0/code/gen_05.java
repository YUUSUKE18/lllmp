import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;
        // 計算結果のメモ化 (n -> 手数)
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                // 入力が終了したか、空行だった場合
                break;
            }

            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) continue; // 1以上の整数のみを扱う

                if (n == 1) {
                    // n=1 の場合は手数は 0
                    long steps = 0;
                    totalSum += steps;
                    // メモ化
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰/メモ化を用いて手数を計算
                    long steps;
                    if (n % 2 == 0) {
                        steps = 1 + memo.get(n / 2);
                    } else {
                        steps = 1 + (long) (3 * n + 1) + memo.get((3 * n + 1));
                    }
                    memo.put(n, steps);
                } else {
                    // メモがあればそれを使用
                    steps = memo.get(n);
                }

                totalSum += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSum);
    }
}
