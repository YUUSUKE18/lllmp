import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int nVal = Integer.parseInt(line);
                long n = nVal;
                int count = 0;
                
                while (n != 1) {
                    if (n % 2 == 0) {
                        n = n / 2;
                    } else {
                        n = 3L * n + 1;
                    }
                    count++;
                }

                total += count;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }
}
