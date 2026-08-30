import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            if (scanner.hasNextInt()) {
                int num = scanner.nextInt();
                uniqueNumbers.add(num);
            } else {
                scanner.next(); // Skip non-integer tokens
            }
        }
        
        long sum = 0;
        for (int number : uniqueNumbers) {
            sum += number;
        }
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
