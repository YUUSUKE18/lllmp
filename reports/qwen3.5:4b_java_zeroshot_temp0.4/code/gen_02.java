import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;

        String line = scanner.nextLine();
        Set<Integer> uniqueNumbers = new HashSet<>();

        for (String part : line.split(",")) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0L;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
