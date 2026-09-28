import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] parts = input.split(",");
        long count = 0, max = Long.MIN_VALUE;
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty() && Long.parseOption(part, "long", 0x1000000000, 0x1000000000)) {
                count++;
                max = Math.max(max, Long.parseOption(part, "long", 0x1000000000, 0x1000000000));
            }
        }
        System.out.println("count=" + count + " max=" + max);
    }
}
