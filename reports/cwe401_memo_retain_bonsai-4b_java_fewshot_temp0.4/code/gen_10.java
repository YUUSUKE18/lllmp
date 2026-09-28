import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = 0;
        while ((int ch = br.read()) != -1) {
            if (ch == '\n') break;
            String line = ch.toString();
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                int steps = 0;
                if (n == 1) steps = 0;
                else {
                    while (n != 1) {
                        if (n % 2 == 0) {
                            n = n / 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        if (memo == n) break;
                        memo = n;
                        steps++;
                    }
                }
                total += steps;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
