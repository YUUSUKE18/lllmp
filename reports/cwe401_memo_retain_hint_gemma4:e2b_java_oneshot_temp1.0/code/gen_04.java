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
            if (line == null) {
                break;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // BFS/Memoizationを適用した計算
                long count = 0;
                long current = n;
                // 3n+1問題の解法に基づいて、1に到達するまでのステップ数を計算
                // nが偶数なら n/2, 奇数なら 3n+1
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        count += memo.get(current);
                        current = 1; // 終了
                        break;
                    }

                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                
                // 1に到達したときのステップ数を記録
                // これは、元のnから1に到達するまでの操作の回数そのものとしてカウントされるべき。
                // 問題文の要求「n が 1 のときの手数は 0 です」と「1 に到達するまでの手数を求めます」を考慮し、
                // ここで計算したcountをメモ化する。
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
