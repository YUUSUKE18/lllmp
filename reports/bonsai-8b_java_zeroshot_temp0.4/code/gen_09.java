import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNext()) {
            String token = scanner.next();
            if (token.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(token);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // Ignore non-integer tokens
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
