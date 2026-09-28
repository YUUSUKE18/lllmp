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

        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1 のときの手数は 0
                    totalSum += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalSum += memo.get(n);
                    continue;
                }

                // 再帰的計算とメモ化
                long steps = 0;
                long current = n;
                
                // 経路を追跡して無限ループやメモ化を確実にする（今回は3n+1問題なので必ず収束する）
                // ただし、メモ化の仕組みとして、計算途中の値も記録する方がより堅牢だが、
                // ここでは最終的な結果のみをメモ化する
                
                // 1に到達するまでの手数を計算
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 途中からメモ化された値があればそこから計算を続ける
                        steps += memo.get(current);
                        current = 1; // 最終的に1に到達したとみなす
                        break;
                    }
                    
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                // 最終的な手数をメモ化
                memo.put(n, steps);
                totalSum += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSum);
    }
}
