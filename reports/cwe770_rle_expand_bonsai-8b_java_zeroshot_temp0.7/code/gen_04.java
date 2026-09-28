import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<String> elements = Arrays.asList(input.split(","));

        long count = 0;
        long sum = 0;

        for (String element : elements) {
            if (element.isEmpty()) continue;
            String[] parts = element.split(":");
            if (parts.length != 2) continue;
            String valueStr = parts[0];
            String numStr = parts[1];

            try {
                long value = Long.parseLong(valueStr);
                long num = Long.parseLong(numStr);
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
