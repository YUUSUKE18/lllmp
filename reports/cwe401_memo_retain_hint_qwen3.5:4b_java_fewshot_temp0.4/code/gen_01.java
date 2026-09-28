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
        long totalSteps = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 1 || !isIntegerInRange(n)) {
                    continue;
                }
                
                totalSteps += calculateCollatz(n, memo);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static boolean isIntegerInRange(int n) {
        // 32bit int の範囲を超えないか確認（負の数も考慮）
        return n >= Integer.MIN_VALUE && n <= Integer.MAX_VALUE;
    }
    
    private static int calculateCollatz(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 3n+1 が 64bit を超える可能性があるため、long で計算
                long nextVal = 3L * n + 1;
                if (nextVal > Long.MAX_VALUE || nextVal < Long.MIN_VALUE) {
                    // 想定外のケースだが、問題文では収まると言われているので
                    // ここではエラー処理なしで continue (実際は収まるはず)
                    break; 
                }
                n = (int) nextVal;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
