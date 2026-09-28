import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        scanner.nextLine(); // consume newline

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

        int count = numbers.size();
        int max = 0;
        for (int num : numbers) {
            if (num > max) max = num;
        }

        System.out.printf("count=%d max=%d\n", count, max);
    }
}
