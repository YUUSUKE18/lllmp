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
                if (n <= 0) continue;
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    if (current > 3200000000) break;
                    if (memo == 0 && memo <= current) {
                        memo = current;
                    }
                    if (memo != current) {
                        break;
                    }
                    steps++;
                }
                if (current == 1) steps = 0;
                total += steps;
            } catch (NumberFormatException e) {}
        }
        System.out.println("total=" + total);
    }
}
