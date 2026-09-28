import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int[] memo = new int[10000000]; // 64bit インテジェクタに収まりる範囲内
        int current = 1;

        while ((int line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                int steps = 0;
                if (n <= 0) continue;
                int val = n;
                if (memo[val] != 0) steps = memo[val];
                else {
                    int prev = val;
                    int next = 0;
                    while (next != 1) {
                        val = (val % 2 == 0) ? val / 2 : 3 * val + 1;
                        if (val > 6094379225481963607L) break;
                        if (memo[val] != 0) steps = memo[val];
                        else memo[val] = steps;
                        if (val == 1) break;
                    }
                    steps = memo[val];
                }
                total += steps;
            } catch (NumberFormatException e) {}
        }
        System.out.println("total=" + total);
    }
}
