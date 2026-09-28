import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int[] values = line.trim().split("\\s+");
        int[] memo = new int[1000000]; // 1000000 は安全な上限（64bit で収まりやすい）
        int total = 0;

        for (String f : values) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (n <= 0) continue;
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    if (current > 1000000) break;
                    if (memo[current] != -1) steps += memo[current];
                    memo[current] = steps;
                    if (current > 1000000) break;
                }
                if (memo[1] == -1) steps = 0;
                total += steps;
            } catch (NumberFormatException e) {}
        }
        System.out.println("total=" + total);
    }
}
