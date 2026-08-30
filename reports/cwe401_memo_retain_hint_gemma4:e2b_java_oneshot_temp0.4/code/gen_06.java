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

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1に到達するまでの手数は0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long count = 0;
                long current = n;
                // 1に到達するまでの手数を計算
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }

                // 1に到達するまでの手数は、現在の計算で求めた手数 + 1 (現在のステップ)
                // ただし、問題文の解釈として、nから1に到達するまでの操作回数を数える。
                // n=1 の場合は 0。
                // n=2 -> 1 (1回)
                // n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
                // ここでは、nから開始して1に到達するまでの操作回数を数える。
                
                // 再計算: nから1に到達するまでの操作回数を正確に数える
                long steps = 0;
                long temp = n;
                while (temp != 1) {
                    if (temp % 2 == 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    steps++;
                }
                
                totalCount += steps;
                memo.put(n, steps);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
