import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                int num = Integer.parseInt(token);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        long count = uniqueNumbers.size();
        long sum = 0;
        for (int num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
