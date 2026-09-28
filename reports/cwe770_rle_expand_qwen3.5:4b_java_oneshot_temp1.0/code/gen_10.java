import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long sum = 0;
        
        if (line != null && !line.trim().isEmpty()) {
            for (String part : line.split(",")) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) continue;
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valueStr);
                    long numRepeats = Long.parseLong(countStr);
                    
                    for (int i = 0; i < numRepeats; i++) {
                        sum += value;
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // 無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
