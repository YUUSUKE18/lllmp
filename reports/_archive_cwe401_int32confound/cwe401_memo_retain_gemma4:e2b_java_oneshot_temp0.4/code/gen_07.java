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
                    // n=1 のときの手数は 0
                    long count = 0;
                    totalCount += count;
                    // 1 は既にメモされている（または計算不要）
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // 計算が必要な場合
                    long steps = 0;
                    int current = n;
                    // 1 に到達するまでの手数を計算
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    totalCount += steps;
                    memo.put(n, steps);
                } else {
                    // メモがあれば加算
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
