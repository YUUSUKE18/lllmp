import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0L;
        
        if (line != null) {
            for (String part : line.trim().split(",")) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = part.indexOf(':');
                if (colonIndex <= 0) continue;
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valueStr);
                    long repeat = Long.parseLong(countStr);
                    
                    if (repeat < 0) continue;
                    
                    sum += value * repeat;
                    count += repeat;
                } catch (NumberFormatException e) {
                    // 無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
