import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int countLine = scanner.nextInt();
        int count = countLine;
        while (count-- > 0) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                numbers.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        int countActual = numbers.size();
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("count=" + countActual + " sum=" + sum);
    }
}
