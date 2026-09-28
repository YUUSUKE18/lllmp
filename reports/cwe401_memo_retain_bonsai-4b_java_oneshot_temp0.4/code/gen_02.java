import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("total=0");
            return;
        }
        String[] parts = line.trim().split("\\s+");
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        for (String f : parts) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (n == 1) {
                    total += 0;
                } else {
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
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
