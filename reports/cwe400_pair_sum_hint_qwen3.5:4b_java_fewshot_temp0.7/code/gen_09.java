import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || !line1.isEmpty()) {
            try {
                long target = Long.parseLong(line1.trim());
                
                java.util.HashSet<Long> seen = new java.util.HashSet<>();
                long totalSum = 0;
                int pairs = 0;
                
                while ((line1 = br.readLine()) != null) {
                    if (line1.trim().isEmpty()) continue;
                    
                    try {
                        long val = Long.parseLong(line1.trim());
                        
                        // Check if there exists a previous value such that prev + val = target
                        long complement = target - val;
                        if (seen.contains(complement)) {
                            pairs++;
                        }
                        
                        seen.add(val);
                        totalSum += val;
                    } catch (NumberFormatException e) {
                        continue;
                    }
                }
                
                System.out.println("pairs=" + pairs);
            } catch (NumberFormatException e) {
                // If target cannot be parsed, output 0 as per robust interpretation or leave default
                System.out.println("pairs=0");
            }
        } else {
            System.out.println("pairs=0");
        }
    }
}
