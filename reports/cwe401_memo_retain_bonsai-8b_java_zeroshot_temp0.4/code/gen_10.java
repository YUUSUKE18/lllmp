import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final Set<Integer> invalidNumbers = new HashSet<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) continue;
                queries.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int total = 0;
        for (int n : queries) {
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }

            int count = 0;
            int current = n;
            while (!memo.containsKey(current) && current != 1) {
                if (current % 2 == 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
                count++;
            }
            if (current == 1) {
                memo.put(current, count);
            } else {
                memo.put(current, count);
            }

            total += count;
        }

        System.out.println("total=" + total);
    }
}
