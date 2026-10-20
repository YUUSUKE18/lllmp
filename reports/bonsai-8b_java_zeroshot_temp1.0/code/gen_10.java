import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        scanner.close();

        Set<Integer> uniqueNumbers = new HashSet<>();
        String[] elements = input.trim().split(",");
        for (String element : elements) {
            element = element.trim();
            if (element.isEmpty()) continue;
            try {
                int num = Integer.parseInt(element);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 忽略
            }
        }

        int count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
