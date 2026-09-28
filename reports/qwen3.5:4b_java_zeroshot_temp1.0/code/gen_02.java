import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BigInteger totalSum = BigInteger.ZERO;
        int count = 0;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long num = Long.parseLong(token);
                if (!totalSum.equals(totalSum.subtract(BigInteger.valueOf(num)))) {
                    // First occurrence of this number
                } else {
                    // Check if already counted by tracking seen numbers to handle duplicates efficiently without Set overhead issues for large inputs (though logic requires uniqueness)
                    // A simpler approach: Use a boolean array or HashSet, but since we need to count *unique* integers only once per value.
                    // Re-reading spec: "重複を除いた整数" -> Unique integers.
                    // We need to track which numbers we've already added to sum and count.
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer elements
                continue;
            }
            
            // To ensure we only process each unique integer once:
            // Since the input stream doesn't guarantee order, we need to track seen numbers.
            // Using a simple approach: Read all into a list, remove duplicates, then sum/count? 
            // Or use a HashSet on the fly.
        }
        
        // Let's rewrite the logic cleanly with a HashSet for uniqueness tracking
    }
    
    // Correct implementation structure
}

// Actually, I will write the correct code directly below without comments or placeholder logic.
