import java.util.*;
import java.io.*;

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
                    numbers.add(Integer.parseInt(part));
                } catch (NumberFormatException e) {
                    // Ignore invalid integers
                }
            }
        }

        Set<Integer> unique = new HashSet<>(numbers);
        int count = unique.size();
        int sum = 0;
        for (int num : unique) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
