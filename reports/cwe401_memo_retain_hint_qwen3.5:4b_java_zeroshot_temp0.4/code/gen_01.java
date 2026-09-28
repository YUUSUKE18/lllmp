import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                total += calculateSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化された結果がある場合、それを使う
        if (memo.containsKey((long)n)) {
            return memo.get((long)n);
        }

        int steps;
        long nextN;

        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3L * n + 1;
        }

        // 64bit 整数の範囲に収まることを保証するため、long で計算する
        steps = 1 + calculateSteps((int)nextN);

        memo.put((long)n, steps);
        return steps;
    }
}
