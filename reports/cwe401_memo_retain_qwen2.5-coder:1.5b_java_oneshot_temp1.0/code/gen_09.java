import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();
        while ((line = br.readLine()) != null) {
            String[] parts = line.split("\\s+");
            boolean found = false;
            for (String part : parts) {
                try {
                    int n = Integer.parseInt(part);
                    if (n == 1) {
                        total += 0;
                        found = true;
                        break;
                    } else {
                        int steps;
                        if (memo.containsKey(n)) {
                            steps = memo.get(n);
                        } else {
                            steps = 1 + n % 2 == 0 ? n / 2 : 3 * n + 1;
                            memo.put(n, steps);
                        }
                        total += steps;
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                    }
                } catch (NumberFormatException e) {
                }
            }
            if (!found) {
                System.out.println("Invalid input: " + line);
            }
        }
        System.out.println("total=" + total);
    }
}
