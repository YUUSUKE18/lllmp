import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        String[] parts = line.trim().split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            String[] kv = part.trim().split(":");
            if (kv.length == 2) {
                try {
                    String valueStr = kv[0].trim();
                    String countStr = kv[1].trim();

                    if (!valueStr.isEmpty() && !countStr.isEmpty()) {
                        long value = Long.parseLong(valueStr);
                        long count = Long.parseLong(countStr);

                        if (count >= 0) {
                            totalCount += count;
                            totalSum += value * count;
                        }
                    }
                } catch (NumberFormatException e) {
                    // Ignore parts that cannot be parsed as numbers
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
