import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                
                long steps = 0;
                long current = n;
                
                // メモ化のチェックと計算
                while (current != 1) {
                    Long cached = memo.get(current);
                    if (cached != null) {
                        steps += cached;
                        break;
                    }
                    
                    boolean isEven = (current % 2 == 0);
                    if (isEven) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                // メモへの登録
                memo.put(n, steps);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
}
