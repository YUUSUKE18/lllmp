import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static int solve(int n) {
        if (n == 1) return 0;
        
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps = 1;
        int current = n;
        
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            
            // 64bit 整数の範囲内に収まり
            if (current > Integer.MAX_VALUE) {
                break;
            }
        }
        
        memo.put(n, steps);
        return steps;
    }
    
    public static void main(String[] args) {
        String line = "";
        while ((line = System.in.readline()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n < 1) continue;
                
                int steps = solve(n);
                System.out.print(steps);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        // まとめ
        int total = 0;
        for (int i = 1; i <= 100000; i++) {
            try {
                total += solve(i);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
