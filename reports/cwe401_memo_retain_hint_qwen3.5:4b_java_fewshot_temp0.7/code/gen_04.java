import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line); // 入力値を long で扱う
                
                int steps = solve(n, memo);
                total += steps;
                
                for (long val : memo.keySet()) {
                    if (val > n) break; 
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int solve(long n, Map<Integer, Integer> memo) {
        // メモ化された結果が存在するか確認
        if (n <= 100000 && memo.containsKey((int)n)) {
            return memo.get((int)n);
        }

        if (n == 1) {
            return 0;
        }

        int nextVal, steps = 1;
        if (n % 2 == 0) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }

        // long に変換して計算する必要がある場合があるため、ここでは intermediate を long で扱う
        if (nextVal > Integer.MAX_VALUE || nextVal < Integer.MIN_VALUE) {
             return solve((int)nextVal, memo); // 実際はオーバーフローの可能性が低いですが、安全に処理するため再帰で continue せず、結果を返す
        } else {
            int result = solve(nextVal, memo);
            if (n <= Integer.MAX_VALUE && n >= Integer.MIN_VALUE) {
                memo.put((int)n, result + 1);
            }
            return result + 1;
        }
    }
}
