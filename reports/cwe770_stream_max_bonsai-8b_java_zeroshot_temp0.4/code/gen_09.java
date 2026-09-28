import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();
        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty() && Integer.parseInt(part) != Integer.MIN_VALUE && Integer.parseInt(part) != Integer.MAX_VALUE) {
                numbers.add(Integer.parseInt(part));
            }
        }
        int count = numbers.size();
        int max = Integer.MIN_VALUE;
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        System.out.println("count=" + count + " max=" + max);
    }
}
