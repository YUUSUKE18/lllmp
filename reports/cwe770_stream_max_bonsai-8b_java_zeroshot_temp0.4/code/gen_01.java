import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();

        for (String token : input.trim().split("\\s*,\\s*")) {
            if (token.isEmpty()) continue;
            try {
                int num = Integer.parseInt(token);
                if (num > Integer.MAX_VALUE || num < Integer.MIN_VALUE) continue;
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = numbers.size();
        int max = Integer.MIN_VALUE;
        for (int num : numbers) {
            if (num > max) max = num;
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
