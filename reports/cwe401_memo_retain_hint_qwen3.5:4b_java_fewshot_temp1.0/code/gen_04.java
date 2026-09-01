import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            for (String s : line.trim().split("\\s+")) {
                try {
                    long n = Long.parseLong(s);
                    total += collatzSteps(n, memo);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int collatzSteps(long n, Map<Long, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long nextVal;
        if (n % 2 == 0) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }
        
        int steps = 1 + collatzSteps(nextVal, memo);
        memo.put(n, steps);
        return steps;
    }
}
