import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int totalSteps = 0;
        int[] memo = new int[1000000]; // 64bit 用の最大値は大めにできるように、2^{32} までは安全
        while ((String line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line.trim());
                if (n == 1) {
                    totalSteps += 0;
                } else {
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (current > 1000000) break;
                        if (memo[current] == 0) {
                            memo[current] = memo[current / 2] + 1;
                        }
                    }
                    totalSteps += memo[current] + 1;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + totalSteps);
    }
}
