import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n が 1 のときの手数は 0 です。
                    // ただし、memo の初期化として 1 は 0 を格納しておく。
                    if (!memo.containsKey(1L)) {
                        memo.put(1L, 0L);
                    }
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // メモ化された値がない場合、計算を開始する
                long currentN = n;
                long steps = 0;
                // 32bit 整数には収まらない可能性があるため、long を使用
                // 64bit 整数の範囲には収まることを前提とする
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN = currentN / 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }

                // 計算結果をメモ化
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
