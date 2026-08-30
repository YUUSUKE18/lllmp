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

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的計算とメモ化
                long count = 0;
                long current = n;
                long steps = 0;

                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // 1 に到達するまでの手数を計算し、メモ化
                // 注意: この問題は「nが1になるまでの手数」を求めるものであり、
                // 典型的なCollatz予想の手数計算とは異なります。
                // 課題の指示に従い、nから1に到達するまでのステップ数を計算します。
                // ただし、メモ化のキーは元のnと計算結果（手数）の関係に基づきます。
                
                // ここでは、nから1に到達するまでのステップ数を計算し、それを合計します。
                // 課題の意図を「各クエリnについて、nが1になるまでの手数を求め、その合計を求める」と解釈し、
                // 各クエリの計算結果を合計します。

                // 再計算（メモ化の利用を考慮して、直接計算結果を格納する）
                long stepsForN = 0;
                long temp = n;
                while (temp != 1) {
                    if (temp % 2 == 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    stepsForN++;
                }
                
                totalCount += stepsForN;
                memo.put(n, stepsForN);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
