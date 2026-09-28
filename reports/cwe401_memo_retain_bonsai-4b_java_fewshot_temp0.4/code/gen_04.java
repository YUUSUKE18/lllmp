import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = new java.util.HashMap<>();
        
        while ((int ch = br.read()) != -1) {
            String line = br.nextLine();
            if (line == null || line.trim().isEmpty()) continue;
            
            String[] parts = line.trim().split("\\s+");
            int n = 0;
            for (String part : parts) {
                if (part == "") continue;
                try {
                    n = Integer.parseInt(part);
                    if (n <= 0) continue;
                    if (memo.containsKey(n)) continue;
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                        if (current > 2147483647 || current < 0) break;
                        if (memo.containsKey(current)) break;
                        memo.put(current, steps);
                    }
                    memo.put(n, steps);
                    total += steps;
                } catch (NumberFormatException e) {}
            }
        }
        System.out.println("total=" + total);
    }
}
