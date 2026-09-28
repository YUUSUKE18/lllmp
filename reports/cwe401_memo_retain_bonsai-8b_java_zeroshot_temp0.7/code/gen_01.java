import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                numbers.add(n);
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }

        int total = 0;
        for (int n : numbers) {
            if (n == 1) {
                total += 0;
                continue;
            }
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
