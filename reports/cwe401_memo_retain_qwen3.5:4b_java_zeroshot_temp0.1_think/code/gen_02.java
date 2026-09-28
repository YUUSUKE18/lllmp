import java.util.*;
import java.io.*;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                total += getSteps(n);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }
        
        System.out.println("total=" + total);
    }

    private static long getSteps(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        long steps = 1 + getSteps(nextN);
        memo.put(n, steps);
        return steps;
    }
}
