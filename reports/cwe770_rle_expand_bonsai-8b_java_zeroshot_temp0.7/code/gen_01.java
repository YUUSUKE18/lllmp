import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        String input = "7:3,2:2";
        List<Integer> values = new ArrayList<>();
        String[] parts = input.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            String[] valuePart = part.split(":");
            if (valuePart.length != 2) continue;
            try {
                int value = Integer.parseInt(valuePart[0]);
                int count = Integer.parseInt(valuePart[1]);
                if (count < 0) continue;
                for (int i = 0; i < count; i++) {
                    values.add(value);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        int count = values.size();
        int sum = 0;
        for (int val : values) {
            sum += val;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
