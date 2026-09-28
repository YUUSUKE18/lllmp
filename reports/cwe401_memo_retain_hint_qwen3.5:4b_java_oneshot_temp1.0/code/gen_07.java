import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int totalStepCount = 0;
        memo.put(1, 0);

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                totalStepCount += collatzSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + totalStepCount);
    }

    private static int collatzSteps(long n) {
        if (n == 1) return 0;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        boolean even = (n % 2 == 0);
        long nextVal = even ? n / 2 : 3 * n + 1;
        
        // 再帰的に呼び出すが、メモ化前に計算開始する
        if (nextVal >= 1) {
            steps = collatzSteps(nextVal);
        } else {
            // 理論上 Collatz sequence は常に正の奇数と偶数に収まるためこのケースは起きないが安全性のために
            steps = -1; 
        }

        if (steps < 0) return steps;

        int mySteps = (even ? 1 : 2); // n/2 -> 1 回、3n+1 -> 2 回（ただし 3n+1 は偶数なので次のステップで n/2 に進む）
        
        memo.put(n, mySteps + steps);
        return memo.get(n);
    }
}
