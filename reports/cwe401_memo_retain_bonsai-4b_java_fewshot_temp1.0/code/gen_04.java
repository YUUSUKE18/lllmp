import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        java.util.Set<Integer> memo = new java.util.HashSet<>();
        int total = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (memo.contains(n)) continue;
                int steps = 0;
                int current = n;
                while (current != 1) {
                    current = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                    if (memo.contains(current)) break;
                    memo.add(current);
                    steps++;
                }
                if (memo.contains(1)) total += steps;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
