import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += memo.getOrDefault(n, 0);
                } else {
                    int steps = calculateCollatzSteps(n, memo);
                    total += steps;
                    memo.put(n, steps);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateCollatzSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        long current = n; // long で計算範囲を確保
        
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
