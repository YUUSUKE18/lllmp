import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long maxVal = Long.MIN_VALUE; // Initialize with minimum possible value for comparison purposes or use a flag.
        
        if (line != null && !line.isEmpty()) {
            boolean first = true;
            String[] parts = line.split(",");
            for (int i = 0; i < parts.length; i++) {
                String part = parts[i].trim();
                try {
                    long n = Long.parseLong(part);
                    count++;
                    
                    if (first) { // Set initial max value on the first valid element.
                        maxVal = n; 
                        first = false;
                    } else {
                        if (n > maxVal) {
                            maxVal = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // Ignore elements that are not integers.
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
