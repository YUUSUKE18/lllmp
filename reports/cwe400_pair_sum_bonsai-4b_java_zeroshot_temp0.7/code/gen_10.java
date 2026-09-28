import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        List<Long> numbers = new ArrayList<>();

        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            try {
                numbers.add(Long.parseLong(line.trim()));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = 0;
        List<List<Long>> pairs = new ArrayList<>();

        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs.add(Arrays.asList(numbers.get(i), numbers.get(j)));
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
