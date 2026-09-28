import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Long> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                long number = Long.parseLong(token);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }
        
        if (uniqueNumbers.isEmpty()) {
            System.out.println("count=0 sum=0");
        } else {
            long count = uniqueNumbers.size();
            long sum = 0;
            for (Long num : uniqueNumbers) {
                sum += num;
            }
            System.out.println("count=" + count + " sum=" + sum);
        }
        
        scanner.close();
    }
}
