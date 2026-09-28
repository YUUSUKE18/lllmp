import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        long totalSum = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) continue;
                
                String valStr = part.substring(0, colonIndex).trim();
                String cntStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valStr);
                    long count = Long.parseLong(cntStr);
                    
                    if (count < 0) continue; 
                    
                    totalCount += count;
                    totalSum += value * count;
                } catch (NumberFormatException e) {
                    // Ignore invalid numbers
                }
            }
        }
        
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
