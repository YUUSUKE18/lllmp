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
                    // nが1のときの手数は0
                    long count = 0;
                    totalCount += count;
                    // 1は既にmemoに存在するか、計算結果が0であることを保証
                    memo.put(1L, 0L);
                } else if (!memo.containsKey(n)) {
                    long current = n;
                    long steps = 0;
                    // 1に到達するまでの手数を計算
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
                    // メモがあればそれを使用
                    long steps = memo.get(n);
                    totalCount += steps;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
