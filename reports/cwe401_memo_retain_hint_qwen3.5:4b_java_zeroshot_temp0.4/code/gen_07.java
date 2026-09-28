import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) {
                    continue;
                }
                
                long currentN = n;
                int steps = 0;
                
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        steps += memo.get(currentN);
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3L * currentN + 1;
                    }
                }
                
                while (true) {
                    if (memo.containsKey(currentN)) {
                        steps += memo.get(currentN);
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3L * currentN + 1;
                    }
                }
                
                totalSteps += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
