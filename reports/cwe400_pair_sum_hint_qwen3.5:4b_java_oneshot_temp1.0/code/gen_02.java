import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        while (targetLine != null && targetLine.trim().isEmpty()) {
            targetLine = br.readLine();
        }
        
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        
        BigInteger target = new BigInteger(targetLine.trim());
        
        String line;
        long count = 0;
        Set<Long> seenNumbers = new HashSet<>();
        int lineNumber = 1; // Target is on line 1, so data starts checking from line 2
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (c == ' ') {
                    break; 
                }
            }
            
            BigInteger numberValue = null;
            String numberStr = "";
            int start = 0;
            
            while (i < line.length()) {
                if (Character.isWhitespace(c)) {
                    // End of a number segment (could be incomplete)
                    break;
                } else {
                    numberStr += c;
                    i++;
                }
                
                // If the character is not space, continue.
            }
            // Need to parse correctly based on space boundaries

        // Let's restart with a cleaner approach for parsing numbers in lines
        long count = 0;
        Set<Long> seenNumbers = new HashSet<>();
        
        lineNumber = 1;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) {
                    continue;
                }
                
                try {
                    BigInteger val = new BigInteger(part);
                    long v = val.longValue();
                    
                    // If the number doesn't fit in long, we cannot do exact difference check with long.
                    // But problem says "values and count fit within 64-bit integer range", which implies intermediate sums 
                    // might exceed, but wait: "values ... fit within 64-bit". So inputs are int/long.
                    // However, target could be large? "Value and count both fit in 64-bit".
                    // This implies target is also long. So BigInteger for everything except the count result (which is also long).
                    
                    if (!val.isNegative()) {
                        val = val.negate(); // We need to handle negative numbers as per typical two-sum problems? 
                        // Wait, standard two sum includes negatives. Let's re-evaluate constraints.
                        // "Values ... fit within 64-bit". This means the input integers are within [-2^63, 2^63-1].
                    }
                    
                    // Check if we found a pair already seen earlier
                    BigInteger negVal = val.negate();
                    BigInteger complement = target.subtract(val);
                    
                    // We need to check if complement exists in our set.
                    // Since inputs are within long range, we can use Long for the map/set keys if complement also fits.
                    // If target and val are both long, then target - val is also representable as long only if no overflow occurs during subtraction?
                    // Actually BigInteger handles arbitrary size. We just need to store the complement in a set.
                    
                    BigInteger comp = target.subtract(val);
                    
                    if (seenNumbers.contains(comp)) {
                        count++;
                    }
                    
                    seenNumbers.add(val);
                } catch (NumberFormatException e) {
                    // Ignore lines that can't be parsed as integers? Or parts of lines?
                    // The problem says "integer as 1 per line". Let's assume standard format.
                }
                
                lineNumber++;
            }
        }

        System.out.println("pairs=" + count);
    }
}
