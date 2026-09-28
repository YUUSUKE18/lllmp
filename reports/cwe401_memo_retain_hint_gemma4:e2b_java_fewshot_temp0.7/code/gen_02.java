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

                // 再帰的または反復的に計算（メモ化を利用）
                long count = 0;
                long current = n;
                
                // 1に到達するまでのステップ数を計算
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        count += memo.get(current);
                        break;
                    }
                    
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                
                // 1に到達した後の最終的な手数を計算し、メモ化
                // ここでの count は、nから1に到達するまでのステップ数（操作回数）ではなく、
                // 実際に計算したパス上のステップ数を表すように調整する必要があります。
                // 問題文の意図は「nから1に到達するまでの操作回数」を求めることと解釈します。
                // 実際の操作回数を計算し、その合計を求める必要があります。
                
                // 再計算して、nから1に到達するまでのステップ数を求める
                long steps = 0;
                long temp = n;
                while (temp != 1) {
                    if (temp % 2 == 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    steps++;
                }
                
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
