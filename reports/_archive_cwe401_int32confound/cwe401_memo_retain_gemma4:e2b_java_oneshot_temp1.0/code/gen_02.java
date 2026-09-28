import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰計算とメモ化
                if (n % 2 == 0) {
                    // nが偶数なら n/2
                    int nextN = n / 2;
                    long count = 1 + memo.getOrDefault(nextN, 0L);
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // nが奇数なら 3n+1
                    int nextN = 3 * n + 1;
                    long count = 1 + memo.getOrDefault(nextN, 0L);
                    memo.put(n, count);
                    totalCount += count;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
