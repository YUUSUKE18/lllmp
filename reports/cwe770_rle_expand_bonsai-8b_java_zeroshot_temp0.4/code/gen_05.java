import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<String> parts = Arrays.asList(input.split(","));
        int count = 0, sum = 0;
        for (String part : parts) {
            String[] values = part.trim().split(":");
            if (values.length != 2) continue;
            try {
                int val = Integer.parseInt(values[0]);
                int freq = Integer.parseInt(values[1]);
                if (freq < 0) continue;
                count += val;
                sum += val * freq;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
