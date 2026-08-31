import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0L;
        long sum = 0L;
        
        if (line != null) {
            line = line.trim();
            for (String part : line.split(",")) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                String[] segments = part.split(":");
                if (segments.length < 2) continue;
                
                int index = -1;
                long value = 0L;
                long countVal = 0L;
                
                try {
                    if (segments[0].trim().isEmpty()) continue;
                    if (segments[1].trim().isEmpty()) continue;
                    
                    // Parse value (index or first part before ':')
                    String valStr = segments[0].trim();
                    String countStr = segments[1].trim();
                    try {
                        index = Integer.parseInt(valStr);
                    } catch (NumberFormatException e) {
                        // If the format is not exactly "int:int", it's invalid per spec logic for "value:count"
                        // But if the spec implies variable types, let's re-read carefully.
                        // Spec says: "値:回数" -> value:count. Example: 7:3,2:2.
                        // So first part is value, second is count.
                    }
                    
                    try {
                        countVal = Long.parseLong(countStr);
                    } catch (NumberFormatException e) {
                    }
                } catch (Exception e) {
                    continue;
                }
                
                if (index < 0 || countVal < 0) continue;
                
                count += countVal;
                sum += index * countVal;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
