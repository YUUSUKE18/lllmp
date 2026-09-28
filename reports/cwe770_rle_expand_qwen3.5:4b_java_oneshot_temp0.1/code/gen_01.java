import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = part.indexOf(':');
                if (colonIndex <= 0) continue;
                
                try {
                    long value = Long.parseLong(part.substring(0, colonIndex));
                    long repeat = Long.parseLong(part.substring(colonIndex + 1));
                    
                    count += repeat;
                    sum += value * repeat;
                } catch (NumberFormatException e) {
                    // 無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
