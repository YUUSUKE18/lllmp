import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        
        String line = scanner.nextLine();
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        if (line != null && !line.trim().isEmpty()) {
            String[] tokens = line.split(",");
            for (String token : tokens) {
                token = token.trim();
                try {
                    int number = Integer.parseInt(token);
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }
        
        long count = uniqueNumbers.size();
        long sum = 0;
        for (int number : uniqueNumbers) {
            sum += number;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
