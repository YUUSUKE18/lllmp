import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<String> parts = Arrays.asList(input.split(","));

        int count = 0;
        long sum = 0;
        String lastValue = "";

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;

            String[] valueStr = part.split(":");
            if (valueStr.length != 2) continue;

            String value = valueStr[0].trim();
            try {
                int valueNum = Integer.parseInt(value);
            } catch (NumberFormatException e) {
                continue;
            }

            String countStr = valueStr[1].trim();
            try {
                int countNum = Integer.parseInt(countStr);
            } catch (NumberFormatException e) {
                continue;
            }

            if (lastValue == null || lastValue.equals(value)) {
                count += countNum;
                sum += valueNum * countNum;
            } else {
                count = countNum;
                sum = valueNum * countNum;
            }

            lastValue = value;
        }

        System.out.println("count=" + count + ", sum=" + sum);
    }
}
