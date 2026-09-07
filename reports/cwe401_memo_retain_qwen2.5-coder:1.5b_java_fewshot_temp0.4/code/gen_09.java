import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[1000001];
        int total = 0;
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            int n = Integer.parseInt(line);
            if (n == 1) {
                total += 0;
            } else if (memo[n] == 0) {
                memo[n] = 1 + (n % 2 == 0 ? n / 2 : 3 * n + 1);
                total += memo[n];
            }
        }
        System.out.println("total=" + total);
    }
}
