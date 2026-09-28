import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        import java.util.HashMap;
        import java.util.Map;
        Map<Integer, Integer> memo = new HashMap<>();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int total = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.trim().split("\\s+");
            for (String s : parts) {
                if (s.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(s);
                    if (n == 1) {
                        total += 0;
                        memo.put(n, 0);
                        continue;
                    }
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                        continue;
                    }
                    int count = 0;
                    int current = n;
                    while (current != 1) {
                        count++;
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                    }
                    memo.put(n, count);
                    total += count;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
