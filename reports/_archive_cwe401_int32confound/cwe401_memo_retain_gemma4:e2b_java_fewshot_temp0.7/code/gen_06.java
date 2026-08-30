import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // nが1のときの手数は0
                    long count = 0;
                    total += count;
                    continue;
                }

                // メモ化された値があるかチェック
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 再帰的計算とメモ化
                long count;
                if (n % 2 == 0) {
                    // nが偶数なら n/2
                    count = (n / 2) + memo.get(n / 2);
                } else {
                    // nが奇数なら 3n+1
                    count = 1 + (3 * n + 1) + memo.get(3 * n + 1);
                }

                memo.put(n, count);
                total += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
