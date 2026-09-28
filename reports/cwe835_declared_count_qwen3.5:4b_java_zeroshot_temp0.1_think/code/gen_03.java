import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        // Read the first line (number of expected integers), ignore it for calculation
        String firstLine = reader.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        long count = 0;
        long sum = 0;
        
        // Read subsequent lines until EOF
        while ((String line = reader.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            try {
                long val = Long.parseLong(trimmedLine);
                count++;
                sum += val;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
