import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[10000001];
        long total = 0;
        while ((br.readLine() != null)) {
            String line = br.readLine();
            if (line != null) {
                int n = 0;
                for (String f : line.split("\\s+")) {
                    if (!f.trim().isEmpty()) {
                        try {
                            n = Integer.parseInt(f);
                            if (n == 1) {
                                total += memo[n];
                                break;
                            }
                            if (memo[n] == 0) {
                                memo[n] = 1 + (n % 2 == 0 ? n / 2 : 3 * n + 1);
                                total += memo[n];
                            }
                        } catch (NumberFormatException e) {
                        }
                    }
                }
            }
        }
        System.out.println("total=" + total);
    }
}
