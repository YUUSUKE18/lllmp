import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                
                if (n == 1) {
                    total += memo.getOrDefault(n, 0);
                } else {
                    int steps = 0;
                    while (n != 1) {
                        if (memo.containsKey(n)) {
                            break;
                        }
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3L * n + 1;
                        }
                        steps++;
                    }
                    
                    memo.put(n, steps);
                    total += memo.getOrDefault(n, 0);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
