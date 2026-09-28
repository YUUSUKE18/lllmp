import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long target = 0;
        int count = 0;

        if (scanner.hasNextLong()) {
            target = scanner.nextLong();
            scanner.nextLine();
        }

        List<Integer> numbers = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                try {
                    int num = Integer.parseInt(line);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // Ignore non-integer lines
                }
            }
        }

        int n = numbers.size();
        int pairs = 0;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairs++;
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
