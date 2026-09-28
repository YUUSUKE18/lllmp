import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long total = 0;
        java.util.HashMap<Long, Long> memo = new java.util.HashMap<>();
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                long n = Long.parseLong(line);
                if (n == 1) {
                    System.out.println("total=" + total);
                    continue;
                }
                if (memo.containsKey(n)) {
                    System.out.println("total=" + total + " " + memo.get(n));
                    continue;
                }
                long current = n;
                int steps = 0;
                boolean even = false;
                while (current != 1) {
                    even = current % 2 == 0;
                    current = even ? current / 2 : 3 * current + 1;
                    steps++;
                    if (current > 1000000000) break;
                }
                memo.put(n, steps);
                total += steps;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
