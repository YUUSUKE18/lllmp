import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // n=1 のときの手数は 0
                    // memo.put(1, 0L); // 1 は特殊ケースとして扱うが、ここでは計算過程で到達する値として扱う
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 再帰的または反復的に計算
                long count = 0;
                int current = n;
                
                // 1 に到達するまでの手数を計算
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }

                // 結果をメモ化し、合計に加算
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }
}
