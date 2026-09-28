import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(part);
                    if (num > Integer.MAX_VALUE) continue;
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
