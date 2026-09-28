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
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰/動的計画法で計算
                long count = 0;
                long current = n;
                
                // 1 に到達するまでの手数を計算
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 途中経過がメモ化されていれば、そこから計算を続ける
                        count += memo.get(current);
                        break;
                    }
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                
                // 1 に到達した後の手数をメモ化
                // ここでの count は n から 1 に到達するまでのステップ数
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
