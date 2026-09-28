import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n が 1 のときの手数は 0
                    long steps = 0;
                    total += steps;
                    continue;
                }

                // メモ化された値があるかチェック
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 再帰的または反復的に計算
                long currentN = n;
                long steps = 0;

                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN = currentN / 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }

                // 計算結果をメモ化し、合計に加算
                memo.put(n, steps);
                total += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
