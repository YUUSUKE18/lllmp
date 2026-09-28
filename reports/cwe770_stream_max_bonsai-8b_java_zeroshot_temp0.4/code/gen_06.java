import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<Integer> numbers = new ArrayList<>();
        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty() && Integer.parseInt(part) >= -2^63 && Integer.parseInt(part) <= 2^63) {
                numbers.add(Integer.parseInt(part));
            }
        }
        int count = numbers.size();
        int max = numbers.isEmpty() ? 0 : Collections.max(numbers);
        System.out.println("count=" + count + " max=" + max);
        scanner.close();
    }
}
