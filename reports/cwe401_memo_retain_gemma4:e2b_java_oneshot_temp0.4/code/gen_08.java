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
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算の実行とメモ化
                long steps = 0;
                long current = n;
                
                // nが1になるまで繰り返す
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                // 1に到達したときのステップ数は、nが1になるまでの操作回数。
                // ただし、問題文の意図を再確認すると、「1に到達するまでの手数」を求めるため、
                // 1に到達するまでの操作回数を数える必要がある。
                // n=3: 3 -> 10 (1) -> 5 (2) -> 16 (3) -> 8 (4) -> 4 (5) -> 2 (6) -> 1 (7) -> 7手
                // 1に到達するまでの手数を求めるため、ループ内でカウントしたstepsが求める値となる。
                
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
