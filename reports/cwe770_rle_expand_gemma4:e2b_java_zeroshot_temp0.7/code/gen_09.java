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
            if (part.isEmpty()) {
                continue;
            }

            String[] kv = part.split(":");
            if (kv.length != 2) {
                continue;
            }

            try {
                long value = Long.parseLong(kv[0].trim());
                long count = Long.parseLong(kv[1].trim());

                if (count >= 0) {
                    totalCount += count;
                    totalSum += value * count;
                }
            } catch (NumberFormatException e) {
                // 無効な数値形式の場合は無視
                continue;
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
        scanner.close();
    }
}
