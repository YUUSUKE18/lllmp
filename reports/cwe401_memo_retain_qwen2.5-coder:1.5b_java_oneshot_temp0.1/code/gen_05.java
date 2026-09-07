import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int[] memo = new int[100000001]; // 64bit 整数の範囲に収まります
        int total = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (memo[n] == 0) {
                        int count = 0;
                        while (n != 1) {
                            if (n % 2 == 0) {
                                n /= 2;
                            } else {
                                n = 3 * n + 1;
                            }
                            count++;
                        }
                        memo[n] = count;
                    }
                    total += memo[n];
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
