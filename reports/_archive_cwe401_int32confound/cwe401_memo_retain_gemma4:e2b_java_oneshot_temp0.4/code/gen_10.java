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

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long count = 0;
                long current = n;
                // 1 に到達するまでの手数を計算
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                
                // 1 に到達するまでの手数は、操作の回数。
                // ただし、問題文の意図を再確認すると、「n が 1 のときの手数は 0」であり、
                // n から 1 に到達するまでの操作回数を求めていると解釈します。
                // 実際には、この問題はコネルの予想（3n+1問題）のステップ数を問うものであり、
                // 1 に到達するまでのステップ数を求める問題です。
                // 1 から n への逆操作で考えると、これは非常に複雑になります。
                // ここでは、与えられた操作を繰り返す「手数」をそのままカウントします。
                
                // 再度、問題文の「n が 1 のときの手数は 0」と「n が 1 に到達するまでの手数を求めます」を考慮します。
                // これは、n から 1 に到達するまでの操作回数を意味します。
                
                // 再計算：n から 1 に到達するまでの手数を求める
                long steps = 0;
                long tempN = n;
                while (tempN != 1) {
                    if (tempN % 2 == 0) {
                        tempN /= 2;
                    } else {
                        tempN = 3 * tempN + 1;
                    }
                    steps++;
                }
                
                totalCount += steps;
                memo.put(n, steps);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
