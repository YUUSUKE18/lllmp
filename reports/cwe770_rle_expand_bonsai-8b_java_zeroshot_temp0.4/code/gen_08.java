import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] parts = input.split(",");
        long count = 0;
        long sum = 0;
        for (String part : parts) {
            String[] values = part.trim().split(":");
            if (values.length != 2) continue;
            try {
                int value = Integer.parseInt(values[0]);
                long num = Long.parseLong(values[1]);
                if (num < 0) continue;
                count += num;
                sum += value * num;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
