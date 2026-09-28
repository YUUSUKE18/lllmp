import java.util.*;
import java.util.stream.Collectors;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final long MAX_ITERATION = 1000000;

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

        long total = numbers.stream()
                .map(n -> n == 1 ? 0 : {
                    int count = 0;
                    int current = n;
                    while (current != 1 && count < MAX_ITERATION) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    return count;
                })
                .collect(Collectors.summingLong(n -> n));

        System.out.println("total=" + total);
    }
}
