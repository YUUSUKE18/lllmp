import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();

        if (input == null || input.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                if (num > Integer.MAX_VALUE) continue;
                if (num < Integer.MIN_VALUE) continue;
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = numbers.size();
        int max = (count == 0) ? 0 : Collections.max(numbers);

        System.out.println("count=" + count + " max=" + max);
    }
}
