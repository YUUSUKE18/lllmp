import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;

        while (scanner.hasNext()) {
            String line = scanner.nextLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }

                int colonIndex = part.lastIndexOf(':');
                if (colonIndex == -1 || colonIndex == 0 || colonIndex == part.length() - 1) {
                    continue;
                }

                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();

                long value;
                try {
                    value = Long.parseLong(valueStr);
                } catch (NumberFormatException e) {
                    continue;
                }

                long times;
                try {
                    times = Long.parseLong(countStr);
                } catch (NumberFormatException e) {
                    continue;
                }

                if (value == 0 && times == 0) {
                    continue;
                }

                for (int i = 0; i < times; i++) {
                    count++;
                    sum += value;
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
