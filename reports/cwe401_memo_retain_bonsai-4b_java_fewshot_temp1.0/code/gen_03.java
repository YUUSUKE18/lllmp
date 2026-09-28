import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
    private static int total;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        while ((String line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                    }
                    steps = 0;
                } else {
                    steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo.containsKey(current)) {
                            steps += memo.get(current);
                        }
                        memo.put(current, memo.get(current) + 1);
                    }
                }
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
