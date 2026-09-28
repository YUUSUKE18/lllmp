import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder result = new StringBuilder();
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // nが1のときの手数は0
                    total += 0;
                } else if (!memo.containsKey(n)) {
                    // 再帰/メモ化による計算
                    long steps;
                    if (n % 2 == 0) {
                        steps = 1 + memo.getOrDefault(n / 2, 0L);
                    } else {
                        steps = 1 + (3 * n + 1) + memo.getOrDefault(3 * n + 1, 0L);
                    }
                    memo.put(n, steps);
                    total += steps;
                } else {
                    // メモがあれば加算
                    total += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        result.append("total=").append(total).append("\n");
        System.out.print(result.toString());
    }
}
