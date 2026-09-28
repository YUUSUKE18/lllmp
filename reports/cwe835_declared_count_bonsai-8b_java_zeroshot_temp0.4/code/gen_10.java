import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int countLine = scanner.nextInt();
        int count = countLine;
        int sum = 0;
        int actualCount = 0;
        int actualSum = 0;

        while (actualCount < count && scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
                actualCount++;
                actualSum += num;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + actualCount + " sum=" + actualSum);
    }
}
