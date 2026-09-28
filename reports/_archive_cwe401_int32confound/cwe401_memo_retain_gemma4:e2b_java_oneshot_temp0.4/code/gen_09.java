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
                if (n < 1) continue;

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    long count = 0;
                    totalCount += count;
                    // 1 の結果をメモ化
                    memo.put(1, count);
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を実行
                    long count = 0;
                    int current = n;
                    // 1 に到達するまでの手数を数える
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    totalCount += count;
                    // 結果をメモ化
                    memo.put(n, count);
                } else {
                    // メモ化されている場合、結果を加算
                    long count = memo.get(n);
                    totalCount += count;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
