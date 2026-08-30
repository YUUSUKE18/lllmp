import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // n=1 の場合は 0 手数
                    total += 0;
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算と再帰処理
                    long steps = 0;
                    long current = n;
                    // 1 に到達するまでの手数を計算
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    // 計算結果をメモ化
                    memo.put(n, steps);
                    total += steps;
                } else {
                    // メモ化されている場合、値を取得
                    total += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
