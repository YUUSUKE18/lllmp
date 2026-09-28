import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;
        // メモ化のためのマップ (n -> 手数)
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    long steps = 0;
                    totalSum += steps;
                    // n=1のケースはメモ化しても良いが、ここでは求めた結果のみを合計する
                    // memo.put(1L, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰的または動的計画法で計算
                    long currentN = n;
                    long count = 0;
                    // nが1になるまで繰り返す
                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        count++;
                    }
                    
                    // 結果をメモ化
                    memo.put(n, count);
                    totalSum += count;
                } else {
                    // メモがあれば加算
                    totalSum += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSum);
    }
}
