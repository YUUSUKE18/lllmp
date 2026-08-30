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
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long steps = 0;
                long current = n;
                // 32bit整数の範囲を超えても64bitで計算し、1に到達するまでのステップ数を数える
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                // 逆順に計算したステップ数を記録するのではなく、
                // 質問は「n が 1 に到達するまでの手数を求め」であり、
                // この操作を繰り返して1に到達するまでのステップ数を求める問題である。
                // 実際には、元の問題設定はCollatz予想に関するもので、
                // 1に到達するまでのステップ数を求める。
                
                // ここで、nから1に到達するまでのステップ数を計算し、メモ化する。
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
