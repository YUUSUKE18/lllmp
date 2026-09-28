import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Set delimiter to comma and any whitespace (including newline)
        sc.useDelimiter("[,\\s]+");
        
        long count = 0;
        long max = Long.MIN_VALUE;
        
        while (sc.hasNext()) {
            String s = sc.next();
            try {
                long val = Long.parseLong(s);
                count++;
                if (val > max) {
                    max = val;
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer elements
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
