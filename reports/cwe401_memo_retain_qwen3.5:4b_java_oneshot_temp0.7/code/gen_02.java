import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                
                if (!memo.containsKey(n)) {
                    memo.put(1, 0);
                    int steps = 0;
                    int current = n;
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            // 3n+1 を計算する際、int のオーバーフローを防ぐため long に昇格させる
                            current = (long) current * 3 + 1; 
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                }
                
                total += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
}
