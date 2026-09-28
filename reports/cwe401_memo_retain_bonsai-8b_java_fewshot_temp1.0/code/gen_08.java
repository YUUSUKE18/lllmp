import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int[] memo = new int[1000000]; // より広いメモ化の範囲
        if (br.readLine() != null) {
            int n = Integer.parseInt(br.readLine());
            if (n == 1) total += 0;
            else {
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (memo[current] != 0) {
                        count += memo[current];
                        current = memo[current];
                    } else {
                        count += 1;
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                    }
                }
                memo[n] = count;
                total += count;
            }
        }
        while (br.readLine() != null) {
            int n = Integer.parseInt(br.readLine());
            if (n == 1) total += 0;
            else {
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (memo[current] != 0) {
                        count += memo[current];
                        current = memo[current];
                    } else {
                        count += 1;
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                    }
                }
                memo[n] = count;
                total += count;
            }
        }
        System.out.println("total=" + total);
    }
}
