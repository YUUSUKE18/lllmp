import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            int count = 0;
            long maxVal = Long.MIN_VALUE; // Initialize with minimum possible value
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                try {
                    long val = Long.parseLong(part);
                    
                    // If it's the first valid number, set maxVal to this value. 
                    // Otherwise update maxVal only if current val is greater than existing maxVal.
                    count++;
                    if (count == 1 || val > maxVal) {
                        maxVal = val;
                    } else {
                        // If we encounter a number smaller or equal to the first valid one, 
                        // and it's not strictly greater, we still need to track the maximum.
                        // However, since Long.MIN_VALUE is initialized with no elements processed yet (count==0),
                        // let's restructure logic slightly for clarity:
                    }
                } catch (NumberFormatException e) {
                    continue; // Ignore non-integer strings
                }
            }

            System.out.println("count=" + count + " max=" + maxVal);
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
