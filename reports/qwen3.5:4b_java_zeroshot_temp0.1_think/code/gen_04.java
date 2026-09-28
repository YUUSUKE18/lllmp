import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Set delimiter to comma and whitespace to handle variations like "1, 2" or "1,2"
        sc.useDelimiter("[,\\s]+");
        
        Set<Long> uniqueNumbers = new HashSet<>();
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long val = Long.parseLong(token.trim());
                uniqueNumbers.add(val);
            } catch (NumberFormatException e) {
                // Ignore non-integers
            }
        }
        
        long count = uniqueNumbers.size();
        long sum = 0;
        for (long num : uniqueNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
