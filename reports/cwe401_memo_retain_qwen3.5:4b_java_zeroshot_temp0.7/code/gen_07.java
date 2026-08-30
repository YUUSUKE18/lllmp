import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Long> memo = new HashMap<>();

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
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static long calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        int nextN = n % 2 == 0 ? n / 2 : 3 * n + 1;
        
        // 次の値がメモ化マップに存在するか確認し、存在すればその深さから 1 を加算
        if (memo.containsKey(nextN)) {
            steps = memo.get(nextN) + 1;
        } else {
            // 再帰呼び出しの結果を計算
            steps = calculateSteps(nextN) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
