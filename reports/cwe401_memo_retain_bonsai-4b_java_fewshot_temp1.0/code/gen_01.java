import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int totalSteps = 0;
        int[] memo = new int[1000000];
        
        while ((String line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    totalSteps += 0;
                    continue;
                }
                
                if (memo[n] != 0) continue;
                
                int steps = 0;
                int current = n;
                int prev = 1;
                
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                    memo[current] = memo[current] == 0 ? 1 : memo[current];
                    if (current > 3200000000) break;
                }
                
                memo[n] = steps + 1; // 1→1までの手数
                totalSteps += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
