import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Set<Integer> uniqueNumbers = new HashSet<>();
            for (String token : line.split(",")) {
                try {
                    int number = Integer.parseInt(token.trim());
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
            
            int count = uniqueNumbers.size();
            long sum = 0L;
            for (Integer number : uniqueNumbers) {
                sum += number;
            }
            
            System.out.println("count=" + count + " sum=" + sum);
        }
    }
}
