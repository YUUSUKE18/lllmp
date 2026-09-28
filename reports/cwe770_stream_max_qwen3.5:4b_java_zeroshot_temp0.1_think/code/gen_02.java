import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        sc.useDelimiter("[,\\s]+");
        
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean hasValue = false;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long val = Long.parseLong(token);
                count++;
                if (!hasValue || val > max) {
                    max = val;
                    hasValue = true;
                }
            } catch (NumberFormatException e) {
                // Ignore non-integers
            }
        }
        
        if (!hasValue) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
