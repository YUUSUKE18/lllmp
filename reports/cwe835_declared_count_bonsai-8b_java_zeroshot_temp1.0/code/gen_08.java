import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int countStr = scanner.readline();
        List<Integer> numbers = new ArrayList<>();

        while (scanner.hasNextLine()) {
            String line = scanner.readline();
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
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
