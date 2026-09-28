import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int[] nums = line.trim().split("\\s+");
        int[] memo = new int[nums.length];
        int total = 0;

        for (String f : nums) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (n == 1) {
                    total += 0;
                } else {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo[current] != 0) {
                            break;
                        }
                        memo[current] = steps + 1;
                        steps++;
                    }
                    if (memo[1] == 0) total += steps;
                }
            } catch (NumberFormatException e) {}
        }
        System.out.println("total=" + total);
    }
}
