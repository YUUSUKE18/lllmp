import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();

        if (input != null && !input.trim().isEmpty()) {
            String[] parts = input.trim().split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(part);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        }

        Set<Integer> uniqueNumbers = new HashSet<>(numbers);
        int count = uniqueNumbers.size();
        int sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
