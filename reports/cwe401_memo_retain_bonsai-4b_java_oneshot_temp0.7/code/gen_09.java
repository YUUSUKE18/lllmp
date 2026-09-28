import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        java.util.Map<Integer, Integer> memo = new java.util.HashMap<>();
        int total = 0;
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                    } else {
                        int steps = 0;
                        int current = n;
                        while (current != 1) {
                            if (current % 2 == 0) {
                                current = current / 2;
                            } else {
                                current = 3 * current + 1;
                            }
                            if (current > 6400000000) {
                                break;
                            }
                            if (memo.containsKey(current)) {
                                break;
                            }
                            memo.put(current, steps + 1);
                            steps++;
                        }
                        if (memo.containsKey(1)) {
                            memo.get(1) = 0;
                        }
                        memo.put(n, steps);
                        total += steps;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
