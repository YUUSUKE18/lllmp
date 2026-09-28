import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        int total = 0;
        String line = br.readLine();
        if (line == null) return;
        String[] parts = line.trim().split("\\s+");
        for (String f : parts) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (memo.containsKey(n)) continue;
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    if (memo.containsKey(current)) break;
                    memo.put(current, steps + 1);
                    steps++;
                }
                if (memo.containsKey(1)) total += steps;
                else total += 0;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
