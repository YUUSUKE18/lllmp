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
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += memo.getOrDefault(1, 0);
                } else {
                    int steps = solve(n, memo);
                    total += steps;
                    memo.put(n, steps);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int solve(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 64bit integer の範囲に収まるように long を使用
                long nextVal = 3L * n + 1;
                if (nextVal > Integer.MAX_VALUE) {
                    // 整数オーバーフローが発生した場合、long で処理し、結果をメモ化
                    steps += solve((int)(nextVal / 2), memo); // 偶数ならそのまま
                    // ただし、問題文の「3n+1」は必ず奇数になるため、次は偶数で n/2 が取られる
                    // しかし、n が非常に大きくなると long でもオーバーフローする可能性があるが、
                    // Collatz 数列は整数範囲内では収束すると仮定し、long で計算する。
                    // 実際には nextVal を long にして処理し、結果を long の階層でメモ化するか、
                    // 問題の制約（32bit 整数に収まらず 64bit に収まる）を考慮して long を使う。
                    // ここでは long で計算し、結果を int として返す（実際には int 範囲に戻る）。
                    n = (int)(nextVal / 2);
                } else {
                    n = (int)nextVal;
                }
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
