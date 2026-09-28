import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        StringBuilder input = new StringBuilder();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            input.append(line);
        }

        String[] elements = input.split(",");
        for (String element : elements) {
            element = element.trim();
            if (!element.isEmpty()) {
                try {
                    int num = Integer.parseInt(element);
                    if (num > Integer.MAX_VALUE) continue;
                    if (num < Integer.MIN_VALUE) continue;
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    continue;
                }
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
