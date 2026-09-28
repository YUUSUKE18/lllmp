import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        long count = 0;
        BigInteger maxVal = BigInteger.ZERO;
        boolean first = true; // Initialize with a flag to ensure the first valid number sets the initial maximum
        
        try {
            String[] parts = line.split(",");
            
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(part.trim());
                        count++;
                        
                        // Handle max calculation carefully to handle negative numbers correctly without a special flag logic that might fail with all negatives < 0 but we need the "largest" (closest to positive infinity)
                        if (!first || val.compareTo(maxVal) > 0) {
                            maxVal = val;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore non-integer elements as per spec ("整数として解釈できない要素も無視します")
                    }
                }
            }
        } catch (Exception e) {
            // In case of any unexpected parsing error, ignore invalid inputs but we need to ensure count is correct based on what was parsed.
            // The try-catch block inside the loop handles individual element issues gracefully.
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
