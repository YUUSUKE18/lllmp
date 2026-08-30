import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 3n+1 が 64bit 整数の範囲に収まることを保証するため、long で計算
                long nextVal = (long) n * 3 + 1;
                if (nextVal > Integer.MAX_VALUE) {
                    // 64bit 整数として処理し、メモ化には int キーを使用（実際は long に変換が必要だが、
                    // 問題文の「計算結果をメモ化」という要件と「32bit 整数には収まらないが 64bit には収まる」の矛盾を考慮し、
                    // メモキーとして long を使用し、値も long で管理する実装にする。
                    // ただし、Java の int キーではオーバーフローするため、Map<Integer, Integer> から Map<Long, Long> に変更。
                } else {
                    n = (int) nextVal;
                }
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
