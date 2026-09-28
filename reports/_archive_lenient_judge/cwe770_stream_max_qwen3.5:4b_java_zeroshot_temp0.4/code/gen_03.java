import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            int count = 0;
            long maxLongValue = Long.MIN_VALUE; // Initialize with the minimum possible value

            for (String token : line.split(",")) {
                try {
                    long num = Long.parseLong(token.trim());
                    if (!Integer.isNaN(num) && !Double.isInfinite(Long.MAX_VALUE - num)) { 
                        count++;
                        maxLongValue = Math.max(maxLongValue, num);
                    }
                } catch (NumberFormatException e) {
                    // Ignore elements that cannot be parsed as integers
                }
            }

            System.out.println("count=" + count + " max=" + maxLongValue);
        } else {
            System.out.println("count=0 max=MIN_VALUE");
        }
    }
}
