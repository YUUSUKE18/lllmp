import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long count = 0;
        long max = Long.MIN_VALUE;
        
        while (sc.hasNext()) {
            String token = sc.next();
            String[] parts = token.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                try {
                    long val = Long.parseLong(part);
                    count++;
                    if (val >= max) {
                        max = val;
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        }
        
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
