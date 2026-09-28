import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Read the first line (expected count), but ignore its value as per spec
        String line1 = br.readLine();
        if (line1 == null) return; 
        
        long sum = 0;
        int count = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // Trim whitespace
            String trimmedLine = line.trim();
            
            // Ignore empty lines
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            try {
                long val = Long.parseLong(trimmedLine);
                sum += val;
                count++;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
