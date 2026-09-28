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
                    // nが1のときの手数は0
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰とメモ化による計算
                    long count;
                    if (n % 2 == 0) {
                        // nが偶数なら n/2
                        count = memo.get(n / 2) + 1;
                    } else {
                        // nが奇数なら 3n+1
                        count = memo.get(3 * n + 1) + 1;
                    }
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // すでにメモがある場合
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
