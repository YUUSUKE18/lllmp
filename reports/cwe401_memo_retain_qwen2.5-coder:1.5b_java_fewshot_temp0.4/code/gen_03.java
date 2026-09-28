import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[1000001];
        int total = 0;
        String line = br.readLine();
        if (line != null) {
            for (String n : line.split("\\s+")) {
                if (!n.trim().isEmpty()) {
                    int i = Integer.parseInt(n);
                    if (i == 1) {
                        total += 0;
                    } else if (memo[i] == 0) {
                        int count = 0;
                        while (i != 1) {
                            if (i % 2 == 0) {
                                i /= 2;
                            } else {
                                i = 3 * i + 1;
                            }
                            count++;
                        }
                        memo[i] = count;
                    }
                    total += memo[i];
                }
            }
        }
        System.out.println("total=" + total);
    }
}
