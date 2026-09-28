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
            if (line == null) {
                break;
            }
            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算
                    if (n % 2 == 0) {
                        // nが偶数なら n/2
                        memo.put(n, 1 + memo.get(n / 2));
                    } else {
                        // nが奇数なら 3n+1
                        memo.put(n, 1 + memo.get(3 * n + 1));
                    }
                }

                // メモから結果を取得し、合計に加算
                totalCount += memo.get(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
