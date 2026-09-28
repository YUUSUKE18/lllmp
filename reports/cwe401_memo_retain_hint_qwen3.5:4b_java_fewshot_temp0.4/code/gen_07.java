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
        long total = 0;
        
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
                n /= 2;
            } else {
                // 3n+1 の計算結果は long で保存し、次へ進む。
                // メモ化には整数値しか使えないので、ここでは途中経過をメモ化しないが、
                // 実際の Collatz 数列は非常に短く収まるため、この実装で十分高速である。
                n = (long)n * 3 + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
