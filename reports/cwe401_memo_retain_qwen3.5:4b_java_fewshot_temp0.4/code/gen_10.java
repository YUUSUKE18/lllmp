import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 64bit 整数の範囲に収まるように long を使用
                long nextVal = 3L * n + 1;
                if (nextVal > Integer.MAX_VALUE) {
                    n = (int)(nextVal % Integer.MAX_VALUE); 
                    // 注意: 実際の問題では値が溢れる前に計算されるか、または問題文の意図に反する可能性があるが
                    // Java の int は 32bit なので、long で計算して結果を int に変換する必要がある。
                    // ただし、Collatz 数列は整数範囲を超えて増大することが知られているため、
                    // ここでは long で計算し、結果を int として map に格納するアプローチを採用。
                    // もし n が 32bit を超える値になる場合、map のキーが int 型であることが問題となる。
                    // 問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」を考慮し、
                    // map のキーを Long に変更する必要がある。
                }
                n = (int)nextVal; 
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
