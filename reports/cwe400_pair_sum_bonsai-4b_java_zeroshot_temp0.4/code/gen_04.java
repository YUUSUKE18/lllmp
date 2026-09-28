import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        List<Long> numbers = new ArrayList<>();

        for (int i = 0; i < scanner.remainingLines(); i++) {
            String line = scanner.next();
            if (!line.isEmpty()) {
                numbers.add(Long.parseLong(line));
            }
        }

        int count = 0;
        Set<Integer> pairs = new HashSet<>();

        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs.add(new HashSet<>(Arrays.asList(i, j)));
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
