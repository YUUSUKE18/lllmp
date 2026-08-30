import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        int count = 0;
        BigInteger maxVal = null;

        for (String part : line.split(",")) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmed);
                    count++;
                    if (maxVal == null || n > maxVal.longValue()) {
                        maxVal = BigInteger.valueOf(n);
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        if (count == 0 && line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        } else if (maxVal != null) {
            sb.append("count=").append(count).append(" max=").append(maxVal.toString());
            // MAX_SAFE_INTEGER check is not needed as BigInteger handles arbitrary size, 
            // but we need to ensure format matches exactly. The prompt implies standard types might fit 64-bit range for max value output?
            // Re-reading spec: "値は 64bit 整数の範囲に収まります" applies to the inputs/outputs likely meaning they can be represented in long if within bounds, 
            // but since we read as BigInteger internally safely and convert back only if needed or just print directly.
            // Wait - prompt says output format is max=<最大値>, so if input was valid 64-bit integer range, printing it is fine via toString().
            System.out.println(sb.toString());
        } else {
             // If count > 0 but all parsed were not numbers? Then max remains null. 
             // Let's adjust logic slightly: only output with proper format when we have processed data or decided default. 
             // Based on previous examples, if input was empty string -> "max=0", so let me correct this behavior for consistent pattern.
             
            System.out.println("count=" + count + " max="+ (count == 0 ? Long.MIN_VALUE : null)); // Not valid yet...
        }
        
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        while ((line = br.readLine()) != null && !line.isEmpty()); 
      if (line == null || line.trim().isEmpty()) {
          System.out.println("count=0 max=" + Long.MIN_VALUE);
           return;
       }

       long[] arr = new long[1]; // To store maximum value safely even though we know it fits 64-bit range but parsing as BigInteger prevents overflow during comparison.
         int count = 0;
      BigInteger currentMax = null;
      
    for (String part : line.split(",")) {
        String trimmed = part.trim();
       if (!trimmed.isEmpty()) {
           try {
               long val = Long.parseLong(trimmed); // Assuming input fits 64-bit integer as per spec.
                count++;
          currentMax = BigInteger.valueOf(val).compareTo(currentMax) > 0 ? BigInteger.valueOf(val) : (currentVal != null ? currentVal : new java.math.BigInteger("")); 
           } catch(NumberFormatException e){}
       }

      if(count == 0 && line.trim().isEmpty()){
    System.out.println("count=0 max=" + Long.MIN_VALUE); return;
    }
    else{
        long finalMax = currentMax.longValue(); // Assuming valid input, this won't throw NPE.
        // If no numbers found but count > 0? That would be invalid input based on spec (only integer list). 
        // Let me rewrite cleanly:

if(count == 0){
    System.out.println("count=0 max=" + Long.MIN_VALUE);
   return;
} else {
       BigInteger[] res = new java.util.ArrayList();
      if(currentMax != null) print(res[0].longValue()); 
 } 

     }
