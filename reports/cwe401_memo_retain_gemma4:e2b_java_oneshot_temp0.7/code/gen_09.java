import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0) {
                    continue;
                }

                if (n == 1) {
                    // n が 1 のときの手数は 0
                    continue;
                }

                if (memo.containsKey(n)) {
                    // メモがあればスキップ
                    continue;
                }

                // メモ化された値がない場合、計算とメモ化
                long steps = 0;
                long current = n;
                
                // 1 に到達するまでの手数を計算
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                    
                    // 再帰的な呼び出しやメモ化のチェックをここで行うことで、
                    // 途中の計算も効率的に処理できるようにする。
                    if (memo.containsKey(current)) {
                        // 途中でメモ化された値に到達した場合、その手数を加算して終了
                        steps += memo.get(current);
                        break;
                    }
                }
                
                // 1 に到達したときのステップ数をメモに保存
                memo.put(n, steps);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
