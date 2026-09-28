import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        HashMap<Integer, Integer> memo = new HashMap<>();
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                    } else {
                        int steps = 0;
                        while (n != 1) {
                            steps++;
                            if (n % 2 == 0) {
                                n /= 2;
                            } else {
                                n = 3 * n + 1;
                            }
                        }
                        total += steps;
                        memo.put(n, steps);
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
