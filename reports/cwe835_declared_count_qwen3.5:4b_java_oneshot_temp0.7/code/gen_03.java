import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        long countInput;
        try {
            countInput = Long.parseLong(line1.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        long actualCount = 0;
        long sum = 0;
        long maxSafeValue = 9223372036854775807L; // Long.MAX_VALUE
        
        String line;
        boolean firstInt = true;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long num = Long.parseLong(line.trim());
                actualCount++;
                
                if (firstInt || num > maxSafeValue) { // Logic simplification since sum is just accumulation
                    sum += num; 
                    firstInt = false;
                } else {
                    sum += num;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
