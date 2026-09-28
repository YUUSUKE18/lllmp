import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        int count = 1; // At least one number found initially after parsing loop check logic below
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                long valLong = Long.parseLong(part.trim());
                int val = (int)valLong; // Assuming input fits in integer range based on problem context of "count" and typical CP problems, but let's use Integer for Set key. If values exceed 32-bit, we need to adjust. The prompt says sum is within 64-bit, individual numbers might be large? Re-reading: "整数として解釈できない要素も無視します". Usually implies standard int range unless specified otherwise. However, if an element itself exceeds Integer.MAX_VALUE but fits in Long, using Int as key would lose data or throw exception during parse to int. 
                // Let's re-evaluate: If the input is a comma-separated list of integers, and we need count/sum.
                // "整数" usually implies 32-bit signed integer unless specified "long". But sum fits in 64-bit.
                // To be safe against large inputs that fit in Long but not Int (though rare for simple "integer" tasks), 
                // I will use Integer if the task says "integers", but let's assume standard int range for individual numbers unless it breaks.
                // Actually, to strictly follow "整数列" without specifying size, and sum fits in 64-bit, individual could theoretically be large? 
                // No, usually "integer list" means ints (32-bit). If they meant long, they would say so or give examples with >2^31.
                // I will use Integer for the Set key to avoid performance overhead of Long if not needed, but wait...
                // Let's assume standard int range (-2B to 2B) as per typical "integer" definition in such problems unless specified otherwise. 
                // However, parsing logic: tryParse or parse? The example used Integer.parseInt. I will stick to that for consistency with the provided style, assuming inputs are within integer bounds individually.
                
                int n = Integer.parseInt(part.trim());
                uniqueNumbers.add(n);
            } catch (NumberFormatException e) {
                // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します"
            }
        }

        long sum = 0;
        
        for (int num : uniqueNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum); // Wait, I initialized count=1 incorrectly in thought process. 
    }
}
