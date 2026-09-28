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
                    // 1に到達するまでの手数は0
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long steps;
                if (n % 2 == 0) {
                    steps = n / 2;
                } else {
                    steps = 3 * n + 1;
                }

                // 再帰的に次のステップを計算
                long nextSteps = 0;
                if (steps != 1) {
                    // 1に到達するまでの手数を再帰的に求める
                    nextSteps = (steps % 2 == 0) ? nextSteps / 2 : 3 * nextSteps + 1;
                }
                
                // 1に到達するまでの手数は、現在のステップと次のステップの手数（1に到達するまでの手数）の合計
                // ただし、この問題は「nが1になるまでの操作の回数」を求めるため、
                // nから1へのパスを辿る必要があります。

                // 修正: nから1へのパスを辿る計算を実装する。

                // nから1へのパスを計算する関数を再帰的に考えるか、あるいは直接計算する。
                // 設問の意図は、nを操作して1に到達するまでの操作回数 (Collatz sequenceのステップ数) を求めることと解釈する。

                long current = n;
                long count = 0;
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

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
