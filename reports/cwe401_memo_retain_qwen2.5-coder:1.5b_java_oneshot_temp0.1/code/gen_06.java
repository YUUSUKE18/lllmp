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
            } else if (n % 2 == 0) {
                total += n / 2;
            } else {
                total += 3 * n + 1;
            }
        }
        System.out.println("total=" + total);
    }
}
