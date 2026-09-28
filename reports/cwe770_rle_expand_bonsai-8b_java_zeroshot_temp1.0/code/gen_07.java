import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] parts = input.split(",");
        long count = 0;
        long sum = 0;
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            String[] valueStr = part.trim().split(":");
            if (valueStr.length != 2) continue;
            try {
                int value = Integer.parseInt(valueStr[0]);
                int freq = Integer.parseInt(valueStr[1]);
                if (freq < 0) continue;
                count += freq;
                sum += value * freq;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
