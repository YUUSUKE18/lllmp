import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int totalSteps = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                
                if (memo.containsKey((int)n)) {
                    totalSteps += memo.get((int)n);
                } else {
                    int steps = 0;
                    long current = n;
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        
                        // メモ化対象の閾値を考慮し、int 範囲内で保存可能な値のみメモ化
                        // 問題文の「同じ整数が繰り返し現れる」という点から、
                        // Collatz 数列は有限な整数範囲内でのループや再訪を持つことが知られている
                        // ただし、64bit 範囲を超えたら int メモ化は不可能になるため、
                        // ここでは計算過程で int 範囲に戻った値をメモ化する戦略を採用する。
                        // または、単に現在の値が int 範囲内ならメモ化し、それ以外の場合は計算のみとする。
                        
                        if (current <= Integer.MAX_VALUE && current >= Integer.MIN_VALUE) {
                            memo.put((int)current, steps);
                        }
                        
                        steps++;
                    }
                    
                    // n の結果を保存
                    if (n <= Integer.MAX_VALUE && n >= Integer.MIN_VALUE) {
                        memo.put((int)n, steps);
                    }
                    
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
