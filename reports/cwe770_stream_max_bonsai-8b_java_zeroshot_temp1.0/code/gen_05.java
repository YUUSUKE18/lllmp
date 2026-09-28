import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();

        String[] elements = input.split(",");
        for (String element : elements) {
            element = element.trim();
            if (element.isEmpty()) continue;
            try {
                int num = Integer.parseInt(element);
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = numbers.size();
        int max = 0;
        for (int num : numbers) {
            if (num > max) max = num;
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
