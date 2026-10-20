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

        Set<Integer> unique = new HashSet<>(numbers);
        int count = unique.size();
        int sum = 0;
        for (int num : unique) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
