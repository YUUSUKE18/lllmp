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
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedLine);

                if (n == 1) {
                    // nが1のときの手数は0
                    long count = 0;
                    totalCount += count;
                    // メモに保存
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // メモにない場合、計算とメモ化
                    long count = 1;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    totalCount += count;
                    memo.put(n, count);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
