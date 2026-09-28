import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = scanner.nextLong();
        List<Long> numbers = new ArrayList<>();

        while (true) {
            String line = scanner.next();
            if (line.isEmpty()) {
                break;
            }
            try {
                numbers.add(Long.parseLong(line));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
