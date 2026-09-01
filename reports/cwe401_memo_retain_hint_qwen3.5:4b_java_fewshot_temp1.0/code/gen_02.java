import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long total = 0;
        
        while (br.ready() || !br.isClosed()) {
            String line = br.readLine();
            if (line == null) break;
            
            // 空白を除去し、空行や数値が入らない場合はスキップ
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                
                // メモ化された値があれば直接使用
                Long cached = memo.get(n);
                if (cached != null) {
                    total += cached;
                    continue;
                }
                
                long current = n;
                long steps = 0;
                
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        // 64bit int を考慮して long で計算
                        // Collatz の性質上、long の範囲を超えなくなる可能性は極めて低いが、
                        // 仕様通り 64bit 整数の範囲に収まることを想定し計算。
                        current = 3L * current + 1;
                    }
                    steps++;
                }
                
                memo.put(n, steps);
                total += steps;
                
            } catch (NumberFormatException e) {
                // 数値ではない行はスキップ
            }
        }
        
        System.out.println("total=" + total);
    }
}
