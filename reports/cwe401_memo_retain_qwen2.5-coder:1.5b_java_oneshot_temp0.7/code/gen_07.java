import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int max = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first || n > max) { max = n; first = false; }
                } catch (NumberFormatException e) {
                }
            }
        }
        int[] memo = new int[max + 1];
        int total = 0;
        for (int i = 0; i <= max; i++) {
            memo[i] = i;
        }
        for (String f : line.trim().split("\\s+")) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (n == 1) continue;
                if (memo[n] == 0) {
                    int count = 0;
                    int temp = n;
                    while (temp != 1) {
                        count++;
                        if (temp % 2 == 0) {
                            temp /= 2;
                        } else {
                            temp = 3 * temp + 1;
                        }
                        memo[temp] = count;
                    }
                    total += count;
                }
                total += memo[n];
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
