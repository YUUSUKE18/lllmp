import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String input = "7:3,2:2";
        List<Integer> numbers = parseInput(input);
        int count = numbers.size();
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static List<Integer> parseInput(String input) {
        List<Integer> result = new ArrayList<>();
        String[] parts = input.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            String[] values = part.split(":");
            if (values.length != 2) continue;
            try {
                int value = Integer.parseInt(values[0]);
                int count = Integer.parseInt(values[1]);
                if (count < 0) continue;
                for (int i = 0; i < count; i++) {
                    result.add(value);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        return result;
    }
}
