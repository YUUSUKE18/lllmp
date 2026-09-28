import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        sc.useDelimiter("[,\\s]+");
        
        Set<Long> uniqueNumbers = new HashSet<>();
        long sum = 0;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long val = Long.parseLong(token);
                uniqueNumbers.add(val);
                sum += val;
            } catch (NumberFormatException e) {
                // Ignore non-integer elements
            }
        }
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
