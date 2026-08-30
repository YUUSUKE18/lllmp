import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        BigInteger countVal = BigInteger.ZERO;
        Integer maxValue = null; // Use wrapper for null handling

        String[] parts = line.split(",");
        
        try {
            for (int i = 0; i < parts.length; i++) {
                String trimmedPart = parts[i].trim();
                if (trimmedPart.isEmpty()) continue;

                BigInteger numStrVal = new BigInteger(trimmedPart); // Interpret as string to handle full range first? Wait, spec says "value is within 64bit integer". But input might be large temporarily or the user made a mistake. Let's assume strict adherence: value fits in long.
                
                // However, if it doesn't fit in long (due to typo or tricky case), using BigInteger for parsing ensures safety until comparison. 
                // Since max must be within 64-bit integer range according to spec ("値は 64bit 整数の範囲に収まる"), we should probably enforce that? Or just compute the maximum among valid numbers provided.
                
                // Let's assume all parsed integers are indeed within long range as per spec, 
                // but let's handle potential overflow during parsing gracefully by catching or using BigInteger temporarily then converting back if needed, though direct long is safer for comparison logic usually unless they exceed 2^63-1 and wrap around.
                
                // Actually simpler approach: Use BigInteger to avoid overflow issues with input exceeding Long.MAX_VALUE before the user realizes their input was wrong per spec? Or trust the spec strictly? 
                
                // Let's re-read carefully: "値は 64bit 整数の範囲に収まります。" -> Input values fit in 64-bit int. So we can parse directly as long without BigInteger logic needed for intermediate storage of value, but let's use Long to be precise with Java semantics on signed integers (unless input is unsigned big integer which technically doesn't fit).
                
                // If the spec implies inputs are validly within [-2^63, 2^63-1], then `long` works. 
                // Let's proceed with long parsing but wrapped in try-catch just in case of non-number strings or actual out-of-range numbers that shouldn't happen per spec.
                
                 if (first) { first = false; countVal = numStrVal.toBigInteger(); maxValueLong.set(numStrVal.toString()); }
            }

        } catch (NumberFormatException e) {
             // Ignore invalid integers as required ("整数として解釈できない要素も無視します") 
         }

        System.out.print("count=");
        
    static BigInteger count;
     public static void main(String[] args) throws Exception { ...
}
