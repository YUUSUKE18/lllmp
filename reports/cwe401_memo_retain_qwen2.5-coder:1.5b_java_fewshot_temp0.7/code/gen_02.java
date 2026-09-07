import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        HashMap<Long, Integer> memo = new HashMap<>();
        int total = 0;
        if (line != null) {
            for (String n : line.split("\\s+")) {
                if (n.isEmpty() || !n.matches("\\d+")) continue;
                long k = Long.parseLong(n);
                if (memo.containsKey(k)) {
                    total += memo.get(k);
                } else {
                    int count = 0;
                    while (k != 1) {
                        if (k % 2 == 0) {
                            k /= 2;
                        } else {
                            k = 3 * k + 1;
                        }
                        count++;
                    }
                    total += count;
                    memo.put(k, count);
                }
            }
        }
        System.out.println("total=" + total);
    }
}
