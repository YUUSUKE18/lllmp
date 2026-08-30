import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;
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
                    // memo.put(1L, 0L); // 1の場合は計算不要なので省略
                } else if (!memo.containsKey(n)) {
                    // 再帰的計算とメモ化
                    long count;
                    if (n % 2 == 0) {
                        count = memo.getOrDefault(n / 2, 0L) + 1;
                    } else {
                        count = memo.getOrDefault(3 * n + 1, 0L) + 1;
                    }
                    memo.put(n, count);
                }
                
                // 再度計算した値を使う
                long result = memo.get(n);
                totalSum += result;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSum);
    }
}
