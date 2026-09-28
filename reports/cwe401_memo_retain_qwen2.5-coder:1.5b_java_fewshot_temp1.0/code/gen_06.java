import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        while ((br.readLine() != null)) {
            int n = Integer.parseInt(br.readLine());
            int steps = 0;
            while (n != 1) {
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                steps++;
            }
            total += steps;
        }
        System.out.println("total=" + total);
    }
}
