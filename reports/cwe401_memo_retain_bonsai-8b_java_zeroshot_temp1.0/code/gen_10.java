import java.util.*;
import java.util.stream.Collectors;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final long MAX = Long.MAX_VALUE;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Long> numbers = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                numbers.add(Long.parseLong(line));
            } catch (NumberFormatException e) {
                // Ignore lines that can't be parsed as integers
            }
        }

        long total = 0;
        for (long n : numbers) {
            if (n == 1) {
                total += 0;
                continue;
            }
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }
            int count = 0;
            long current = n;
            while (!current.equals(1)) {
                if (current % 2 == 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
                count++;
            }
            memo.put(n, count);
            total += count;
        }

        System.out.println("total=" + total);
    }
}
