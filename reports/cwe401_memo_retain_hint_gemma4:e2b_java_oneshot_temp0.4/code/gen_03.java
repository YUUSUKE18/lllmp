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
                    // ただし、これはクエリ n から 1 に到達するまでの手数を求める問題なので、
                    // n=1 の場合は既に終了していると見なします。
                    // ここでは、n が入力された時点での操作回数を数えるため、
                    // n=1 は既に終了なので、このクエリの操作回数は 0 です。
                    // ただし、問題文の「n が 1 のときの手数は 0 です」は、
                    // 1 からスタートして 1 に到達するまでの操作回数を指していると解釈します。
                    // ここでは、n から 1 に到達するまでの操作回数を求めるため、
                    // n=1 の場合は 0 です。
                    // 既に計算済みの場合はメモから取得
                    if (memo.containsKey(n)) {
                        totalSteps += memo.get(n);
                    } else {
                        // n=1 の場合は 0
                        totalSteps += 0;
                        memo.put(n, 0L);
                    }
                } else if (!memo.containsKey(n)) {
                    long steps = 0;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    totalSteps += steps;
                    memo.put(n, steps);
                } else {
                    // メモに既に存在する場合は、合計に加算
                    totalSteps += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
