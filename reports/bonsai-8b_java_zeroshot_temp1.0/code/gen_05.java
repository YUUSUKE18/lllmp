import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        String input = scanner.nextLine();

        if (input == null || input.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] elements = input.trim().split(",");
        for (String element : elements) {
            if (element.trim().isEmpty()) continue;
            try {
                int number = Integer.parseInt(element.trim());
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = uniqueNumbers.size();
        int sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
