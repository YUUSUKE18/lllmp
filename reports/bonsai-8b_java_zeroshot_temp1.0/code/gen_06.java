import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();

        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                numbers.add(Integer.parseInt(part));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        Map<Integer, Integer> uniqueCounts = new HashMap<>();
        int sum = 0;

        for (int num : numbers) {
            if (!uniqueCounts.containsKey(num)) {
                uniqueCounts.put(num, 1);
                sum += num;
            } else {
                uniqueCounts.put(num, uniqueCounts.get(num) + 1);
            }
        }

        int count = 0;
        for (int num : uniqueCounts.keySet()) {
            count += uniqueCounts.get(num);
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
