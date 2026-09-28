import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while ((String line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                } else {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            steps = memo.get(current);
                        } else {
                            current = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                            steps = steps == 0 ? 1 : steps + 1;
                            if (current > 1000000000) break;
                        }
                    }
                    memo.put(current, steps);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
