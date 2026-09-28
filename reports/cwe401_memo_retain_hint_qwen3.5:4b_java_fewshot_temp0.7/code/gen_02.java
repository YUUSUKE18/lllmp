import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;
        long n;

        while ((n = Long.parseLong(br.readLine())) != null) {
            // 空白行や解析エラーがある場合はスキップ（長期的に読み続けるため）
            try {
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        
        // メモ化済みかチェック
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        long nextN;
        
        while (n != 1) {
            steps++;
            if (n % 2 == 0) {
                nextN = n / 2;
            } else {
                nextN = 3 * n + 1;
            }
            n = nextN;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
