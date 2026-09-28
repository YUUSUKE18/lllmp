import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int[] memo = new int[10000001]; // 高速化のためにメモ化
        int total = 0;
        boolean first = true;
        if (line != null) {
            String[] queries = line.trim().split("\\s+");
            for (String f : queries) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (memo[n] == 0) {
                        int steps = 0;
                        while (n != 1) {
                            steps++;
                            if (n % 2 == 0) {
                                n /= 2;
                            } else {
                                n = 3 * n + 1;
                            }
                        }
                        memo[n] = steps;
                    }
                    total += memo[n];
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
