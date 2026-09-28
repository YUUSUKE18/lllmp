import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long total = 0L;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                if (n < 0 || !isValidCollatzTerm(n)) continue;
                
                total += collatzStep(n, memo);
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("total=" + total);
    }

    private static boolean isValidCollatzTerm(long n) {
        if (n <= 0 || !isEvenOrOdd(n)) {
            return false;
        }
        return true;
    }

    private static boolean isEvenOrOdd(long n) {
        return n % 2 == 0 || n % 2 == 1;
    }

    private static long collatzStep(long n, Map<Long, Long> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        long steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            if (memo.containsKey(n)) {
                long val = memo.get(n);
                while (val != 0 && n % 2 == 0) {
                    n /= 2;
                    val--;
                    steps++;
                }
                steps += val;
                break;
            }
        }
        if (!memo.containsKey(n)) {
            long[] values = new long[n];
            for (long i = 0; i < n / 64 + 1; i++) {
                values[i] = memo.get(i);
            }
            for (long i = 0; i < n % 64; i++) {
                values[i] = memo.get(i);
            }
            for (int j = 0; j < n / 64 - (n % 64) && memo.containsKey(j + i); j++) {
                long val = memo.get(n);
                while (val != 0 && n % 2 == 0) {
                    n /= 2;
                    val--;
                    steps++;
                }
                steps += val;
            }
            memo.put(n, steps);
        }
        return steps;
    }

    private static long getCollatzStep(long n) {
        if (n <= 0 || !isEvenOrOdd(n)) {
            return -1;
        }
        long steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        return steps;
    }

    private static long computeCollatz(long n) {
        if (n == 1) return 0;
        long steps = 0;
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long[] queue = new long[256];
        int head = 0;
        int tail = 0;
        queue[tail++] = n;
        
        while (head < tail) {
            long curr = queue[head++];
            if (curr % 2 == 0) {
                curr /= 2;
            } else {
                curr = 3 * curr + 1;
            }
            steps++;
            if (!memo.containsKey(curr)) {
                queue[tail++] = curr;
            }
        }
        
        while (head < tail) {
            long curr = queue[head++];
            if (curr % 2 == 0) {
                curr /= 2;
            } else {
                curr = 3 * curr + 1;
            }
            steps++;
            if (!memo.containsKey(curr)) {
                queue[tail++] = curr;
            }
        }
        
        while (head < tail) {
            long curr = queue[head++];
            if (curr % 2 == 0) {
                curr /= 2;
            } else {
                curr = 3 * curr + 1;
            }
            steps++;
            if (!memo.containsKey(curr)) {
                queue[tail++] = curr;
            }
        }
        
        return steps;
    }

    private static long getSteps(long n, Map<Long, Long> memo) {
        if (n <= 0 || !isEvenOrOdd(n)) {
            return -1;
        }
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
        }
    }
}
