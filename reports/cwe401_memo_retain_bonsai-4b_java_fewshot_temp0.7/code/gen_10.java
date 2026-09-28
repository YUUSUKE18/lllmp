import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int totalSteps = 0;
        int memo = new java.util.HashMap<>();
        
        while ((String line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) continue;
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                        break;
                    }
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                memo.put(current, steps);
                totalSteps += steps;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + totalSteps);
    }
}
