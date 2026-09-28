import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Set delimiter to comma and whitespace to handle "comma-separated integers" robustly
        sc.useDelimiter("[,\\s]+");
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                int num = Integer.parseInt(token);
                uniqueNumbers.add(num);
                sum += num;
            } catch (NumberFormatException e) {
                // Ignore non-integer elements
            }
        }
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
