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
            if (!part.isEmpty() && isInteger(part)) {
                numbers.add(Integer.parseInt(part));
            }
        }

        int count = numbers.size();
        int max = numbers.isEmpty() ? 0 : numbers.stream().max(Integer::intValue).orElse(0);

        System.out.println("count=" + count + " max=" + max);
    }

    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
