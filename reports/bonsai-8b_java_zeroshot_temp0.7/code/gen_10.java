import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();

        while (scanner.hasNext()) {
            String token = scanner.next();
            if (token.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(token);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 解釈できない要素は無視
            }
        }

        int count = uniqueNumbers.size();
        int sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
