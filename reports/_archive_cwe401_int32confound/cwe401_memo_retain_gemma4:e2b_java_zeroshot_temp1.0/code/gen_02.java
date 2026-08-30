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
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1の場合、再帰的な計算で0になるので、これは不要かもしれないが、念のため
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long result = memo.get(n);
                    totalCount += result;
                    continue;
                }

                // 再帰的計算とメモ化
                long count;
                if (n % 2 == 0) {
                    // nが偶数なら n/2
                    count = (n / 2) + memo.get(n / 2);
                } else {
                    // nが奇数なら 3n+1
                    count = (3 * n + 1) + memo.get(3 * n + 1);
                }

                // 計算結果をメモ化し、合計に加算
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
