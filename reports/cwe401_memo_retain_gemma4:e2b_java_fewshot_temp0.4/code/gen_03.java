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
                    // 1 に到達するまでの手数は 0
                    totalCount += 0;
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算とメモ化
                    long count = 0;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // メモ化されている場合、結果を加算
                    totalCount += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
