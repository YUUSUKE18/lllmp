import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        boolean first = true;
        while (true) {
            String line = br.readLine();
            if (line == null || line.isEmpty()) break;
            int n = Integer.parseInt(line);
            if (n == 1) {
                total += 0;
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
            }
        }
        System.out.println("total=" + total);
    }
}
