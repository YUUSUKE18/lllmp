import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNext()) return;
        
        String line = scanner.nextLine();
        int count = 0;
        long sum = 0L; // Using BigInteger for safety during accumulation, then cast to long as spec guarantees fit
        
        try {
            while (line.length() > 1) { // Skip empty lines and single whitespace-only lines if any logic needed later, but here we process token by token
            
                int startIdx = line.indexOf(',');
                
                if (startIdx == -1 && !Character.isWhitespace(line.charAt(0))) {
                    break; 
                } else if (line.trim().isEmpty()) {
                    continue; // Should not happen based on logic but safe to handle
                }

                String[] parts = line.split(",");
                
                for (String part : parts) {
                    try {
                        long value = Long.parseLong(part);
                        
                        sum += value;
                        count++;
                    } catch (NumberFormatException e) {
                        // Ignore non-integer elements
                    }
                }
            }
        } finally {
            scanner.close();
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
