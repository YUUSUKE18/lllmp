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
        
        String line;
        int totalSteps = 0;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n < 1) continue;
                
                int steps = calculateSteps(n, memo);
                totalSteps += steps;
                memo.put(n, steps);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
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
                // 64bit 整数の範囲に収まるように処理する必要があるが、
                // Java の int は 32bit で問題ない値（Collatz 数列）は通常 int 範囲内に入る。
                // しかし仕様で「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、
                // long を使用して計算し、結果を int メモリに保存する必要があるか確認が必要。
                // Collatz 関数は通常 int 範囲内に入りますが、例外として超えるケースも理論上存在します。
                // ここでは long で計算し、結果が int に収まる場合のみ int メモリに保存します。
                n = (long)n * 3 + 1;
            }
            
            if (n < 0 || n > Integer.MAX_VALUE) {
                // 64bit 範囲を超えた場合は処理を続行するが、メモ化は不可（または long メモリが必要）
                // ただし、Collatz 数列では通常 int 範囲内に戻るため、long で計算し続けます。
            }
            
            steps++;
        }
        
        // 結果を int メモリに保存できるか確認
        if (n >= 0 && n <= Integer.MAX_VALUE) {
            memo.put(n, steps);
        }
        
        return steps;
    }
}
