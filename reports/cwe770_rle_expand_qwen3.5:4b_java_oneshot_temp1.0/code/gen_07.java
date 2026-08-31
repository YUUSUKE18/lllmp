import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = part.indexOf(':');
                if (colonIndex <= 0) continue;
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long v = Long.parseLong(valueStr);
                    long c = Long.parseLong(countStr);
                    if (v != 0 || c > 0) {
                        count += c;
                        sum += v * c;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
