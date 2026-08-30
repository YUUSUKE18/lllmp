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
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1) {
                    continue;
                }

                if (n == 1) {
                    // nが1のときの手数は0
                    long count = 0;
                    totalCount += count;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 計算プロセス
                long current = n;
                long steps = 0;
                // 繰り返し計算とメモ化
                while (current != 1) {
                    if (memo.containsKey((int) current)) {
                        // 途中でメモ化された値に到達した場合
                        long memoizedSteps = memo.get((int) current);
                        steps += memoizedSteps;
                        break;
                    }

                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // 最終結果をメモ化
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }
}
