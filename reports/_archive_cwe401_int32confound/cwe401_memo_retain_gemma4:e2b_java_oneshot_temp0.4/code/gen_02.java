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
                if (n < 1) continue;

                if (n == 1) {
                    // nが1のときの手数は0
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰または反復計算で手数を求める
                    long count = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    memo.put(n, count);
                }
                
                // メモ化された値を取得し、合計に加算
                totalCount += memo.get(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
