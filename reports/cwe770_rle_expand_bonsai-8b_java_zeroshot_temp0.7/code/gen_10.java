import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<String> parts = Arrays.asList(input.split(","));
        int count = 0, sum = 0;
        for (String part : parts) {
            if (part.isEmpty()) continue;
            int valueStr = part.split(":")[0];
            int countStr = part.split(":")[1];
            if (!valueStr.matches("\\d+") || !countStr.matches("\\d+")) continue;
            int value = Integer.parseInt(valueStr);
            int num = Integer.parseInt(countStr);
            if (num < 0) continue;
            for (int i = 0; i < num; i++) {
                count++;
                sum += value;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
