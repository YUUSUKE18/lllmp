import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    static {
        memo.put(1L, 0);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                totalSteps += getSteps(n);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }
        System.out.println("total=" + totalSteps);
    }

    private static int getSteps(long n) {
        if (n == 1) return memo.get(1L);
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long curr = n;
        List<Long> path = new ArrayList<>();
        
        while (!memo.containsKey(curr) && curr != 1) {
            path.add(curr);
            curr = (curr % 2 == 0) ? curr / 2 : 3 * curr + 1;
        }

        int stepsToKnown = memo.get(curr);
        
        for (int i = path.size() - 1; i >= 0; i--) {
            long val = path.get(i);
            long nextVal = (i == path.size() - 1) ? curr : path.get(i + 1);
            int steps = 1 + memo.get(nextVal);
            memo.put(val, steps);
        }

        return memo.get(n);
    }
}
