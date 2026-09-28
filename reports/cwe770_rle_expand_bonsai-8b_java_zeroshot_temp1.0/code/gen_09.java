import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        String[] parts = input.split(",");
        long count = 0;
        long sum = 0;
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            String[] valueStr = part.trim().split(":");
            if (valueStr.length != 2) continue;
            try {
                int value = Integer.parseInt(valueStr[0]);
                int countStr = valueStr[1];
                if (countStr.trim().isEmpty()) continue;
                int countNum = Integer.parseInt(countStr);
                if (countNum < 0) continue;
                count += value;
                sum += value * countNum;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
