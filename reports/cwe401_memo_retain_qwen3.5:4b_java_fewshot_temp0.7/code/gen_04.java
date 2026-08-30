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
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line.trim());
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }
                
                int count = 0;
                long current = n;
                
                while (true) {
                    if (current == 1) break;
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3L * current + 1;
                    }
                    count++;
                }
                
                memo.put(n, count);
                total += count;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
