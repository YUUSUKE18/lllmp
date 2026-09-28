import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int countLine = 0;
        List<Integer> numbers = new ArrayList<>();

        for (int i = 0; i < args.length; i++) {
            String line = args[i];
            if (line.trim().isEmpty()) continue;

            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
                countLine = Integer.parseInt(line);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = numbers.size();
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
