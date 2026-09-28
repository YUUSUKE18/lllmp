import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Set<Long> memo = new HashSet<>();
        long total = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            int startN;
            try {
                // 空白を除去し整数に解析
                int firstNonSpaceIndex = -1;
                for (int i = 0; i < line.length(); i++) {
                    if (!Character.isWhitespace(line.charAt(i))) {
                        firstNonSpaceIndex = i;
                        break;
                    }
                }

                if (firstNonSpaceIndex != -1) {
                    startN = Integer.parseInt(line.substring(firstNonSpaceIndex).trim());
                } else {
                    continue;
                }

            } catch (NumberFormatException e) {
                continue;
            }

            total += collatzStep(startN, memo);
        }

        System.out.println("total=" + total);
    }

    private static long collatzStep(long n, Set<Long> memo) {
        if (memo.contains(n)) {
            return memo.get(n);
        } else if (n == 1) {
            memo.add(n);
            return 0;
        }

        long steps;
        if (n % 2 == 0) {
            steps = 1 + collatzStep(n / 2, memo);
        } else {
            steps = 1 + collatzStep(3 * n + 1, memo);
        }

        memo.add(n);
        return steps;
    }
}
