import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        boolean first = true;
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (first || n > 1) {
                    int count = 0;
                    while (n != 1) {
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        count++;
                    }
                    total += count;
                    first = false;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
