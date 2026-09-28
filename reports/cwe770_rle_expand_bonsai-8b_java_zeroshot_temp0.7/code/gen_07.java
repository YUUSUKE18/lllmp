import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<String> parts = Arrays.asList(input.split(","));
        int count = 0, sum = 0;
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            String[] values = part.trim().split(":");
            if (values.length != 2) continue;
            try {
                int value = Integer.parseInt(values[0]);
                int frequency = Integer.parseInt(values[1]);
                if (frequency < 0) continue;
                count += value;
                sum += value * frequency;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
