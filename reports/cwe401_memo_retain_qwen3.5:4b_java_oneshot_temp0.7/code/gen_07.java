import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                long current = n;
                int count = 0;
                
                while (current != 1) {
                    long next;
                    if (current % 2 == 0) {
                        next = current / 2;
                    } else {
                        next = 3L * current + 1;
                    }
                    
                    if (memo.containsKey(next)) {
                        count += memo.get(next);
                        break;
                    }
                    
                    memo.put(current, 1);
                    current = next;
                    count++;
                }
                
                total += count;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
