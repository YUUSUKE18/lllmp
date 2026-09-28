import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = 0;
        String line = br.readLine();
        while (line != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) total += 0;
                else {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (current > 1000000000000L) break;
                        steps++;
                        if (memo == current) break;
                        memo = current;
                    }
                    total += steps;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
