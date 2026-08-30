import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) {
                    continue;
                }
                totalSteps += collatz(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int collatz(int n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps;
        if (n % 2 == 0) {
            steps = 1 + collatz(n / 2);
        } else {
            // 3n+1 が 64bit integer を超える可能性があるため、long で計算し、結果を long にしてメモ化
            long nextVal = (long)n * 3 + 1;
            steps = 1 + collatz((int)nextVal); 
        }
        
        memo.put(n, steps);
        return steps;
    }
}
