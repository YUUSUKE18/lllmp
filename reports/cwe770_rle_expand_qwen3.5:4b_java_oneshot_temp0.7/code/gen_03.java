import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

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
                if (colonIndex <= 0 || colonIndex >= part.length() - 1) continue;
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    int value = Integer.parseInt(valueStr);
                    long repetition = Long.parseLong(countStr);
                    sum += value * repetition;
                    count += repetition;
                } catch (NumberFormatException e) {
                    // 無視する
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
