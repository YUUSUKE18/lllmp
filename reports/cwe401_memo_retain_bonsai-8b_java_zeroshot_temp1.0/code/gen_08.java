import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int total = 0;
        for (int n : numbers) {
            total += handshakes(n);
        }

        System.out.println("total=" + total);
    }

    private static int handshakes(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        int steps = 0;
        int current = n;
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
