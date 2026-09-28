import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<String> parts = Arrays.asList(input.split(","));

        int count = 0;
        long sum = 0;
        int value = 0;
        int freq = 0;

        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            String[] values = part.trim().split(":");
            if (values.length != 2) continue;

            try {
                value = Integer.parseInt(values[0]);
                freq = Integer.parseInt(values[1]);

                if (value < 0 || freq < 0) continue;

                count += freq;
                sum += value * freq;

            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
