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

            String[] keyValue = part.split(":");
            if (keyValue.length != 2) {
                continue;
            }

            try {
                // 値は int/long に変換可能と仮定
                long value = Long.parseLong(keyValue[0].trim());
                long count = Long.parseLong(keyValue[1].trim());

                // 回数が 0 以上であることを確認 (仕様で保証されているが念のため)
                if (count >= 0) {
                    totalCount += count;
                    totalSum += value * count;
                }
            } catch (NumberFormatException e) {
                // 数値変換に失敗した場合は無視
                continue;
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
        scanner.close();
    }
}
