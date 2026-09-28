import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Set delimiter to comma and whitespace (spaces, tabs, newlines)
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
                // Ignore non-integer elements
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
