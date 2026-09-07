import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String[] numbers = line.split("\\s+");
            long[] memo = new long[numbers.length];
            for (int i = 0; i < numbers.length; i++) {
                try {
                    int n = Integer.parseInt(numbers[i]);
                    if (n == 1) {
                        total += 0;
                        break;
                    }
                    long count = 0;
                    while (n != 1) {
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        count++;
                    }
                    total += count;
                    memo[i] = count;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
