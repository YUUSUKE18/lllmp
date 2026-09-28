import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                while (n != 1) {
                    boolean isEven = (n % 2 == 0);
                    if (isEven) {
                        n /= 2;
                    } else {
                        n = 3L * n + 1;
                    }
                    if (memo.containsKey(n)) {
                        long steps = memo.get(n);
                        total += steps;
                        break;
                    }
                    memo.put(n, memo.getOrDefault(n, 0) + 1);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
