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

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 のときの手数は 0
                    total += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 繰り返し操作の計算
                long steps = 0;
                long current = n;
                
                // 64bit整数で計算を進める
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                    
                    // メモ化された値があればそれを利用してスキップする (より強力なメモ化)
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                        break;
                    }
                }

                // 1 に到達した後のステップ数を記録（これは元のnから1に到達するまでのステップ数なので、現在のstepsが求める値）
                memo.put(n, steps);
                total += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
