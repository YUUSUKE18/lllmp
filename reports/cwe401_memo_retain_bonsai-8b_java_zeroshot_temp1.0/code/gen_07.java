import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final long TOTAL = 1_000_000_000_000L;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                if (num >= 1 && num <= Integer.MAX_VALUE) {
                    queries.add(num);
                }
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }

        long total = 0;
        for (int n : queries) {
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }
            int count = 0;
            int current = n;
            while (current != 1) {
                count++;
                if (current % 2 == 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
            }
            memo.put(n, count);
            total += count;
        }

        System.out.println("total=" + total);
    }
}
