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

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // この問題の要求は「1 に到達するまでの手数」であり、
                    // 操作を繰り返して1に到達する過程の手数を数えることと解釈します。
                    // 1からスタートした場合は0手数。
                    // 1が入力された場合、そのクエリが終了したとみなします。
                    // ただし、問題文の記述「n が 1 のときの手数は 0 です」を考慮すると、
                    // n=1が入力された場合は手数は0として加算するのが自然です。
                    // ここでは、nが1の場合、そのクエリのステップ数は0として扱います。
                    memo.put(n, 0L);
                    totalSteps += 0;
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を実行
                    long steps = 0;
                    long current = n;
                    // 1に到達するまでの手数を求める
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                    totalSteps += steps;
                } else {
                    // メモ化されている場合、加算
                    totalSteps += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
