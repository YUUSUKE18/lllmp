import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Set delimiter to comma and whitespace (including newlines)
        sc.useDelimiter("[,\\s]+");
        
        long count = 0;
        long max = Long.MIN_VALUE; 
        
        while (sc.hasNext()) {
            String token = sc.next();
            // Trim whitespace around the number
            token = token.trim();
            
            if (token.isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(token);
                count++;
                if (val > max) {
                    max = val;
                }
            } catch (NumberFormatException e) {
                // Ignore elements that cannot be interpreted as integers
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
