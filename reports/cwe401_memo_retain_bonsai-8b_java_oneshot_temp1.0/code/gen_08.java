import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        import java.util.HashMap;
        import java.util.Map;
        import java.util.Set;
        import java.util.HashSet;
        import java.util.TreeSet;

        Set<Integer> seen = new HashSet<>();
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    if (n == 1) {
                        total += 0;
                        continue;
                    }
                    if (seen.contains(n)) {
                        total += memo.get(n);
                        continue;
                    }
                    seen.add(n);
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                        if (current == 1) break;
                    }
                    memo.put(n, steps);
                    total += steps;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
