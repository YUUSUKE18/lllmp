import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line);
                totalSteps += solve(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int solve(int n) {
        if (n == 1) {
            return 0;
        }
        long current = n;
        int steps = 0;
        
        while (current != 1) {
            if (memo.containsKey(current)) {
                steps += memo.get((int) current);
                break;
            }
            
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3L * current + 1;
            }
        }
        
        while (current != 1) {
            if (memo.containsKey(current)) {
                steps += memo.get((int) current);
                break;
            }
            
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3L * current + 1;
            }
        }
        
        return steps;
    }
}
