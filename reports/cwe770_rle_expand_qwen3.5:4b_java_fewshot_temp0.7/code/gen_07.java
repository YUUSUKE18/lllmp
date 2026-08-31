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
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                try {
                    int colonIndex = part.indexOf(':');
                    if (colonIndex == -1 || colonIndex == 0 || colonIndex == part.length() - 1) {
                        continue;
                    }
                    
                    String keyStr = part.substring(0, colonIndex);
                    String valStr = part.substring(colonIndex + 1);
                    
                    long value = Long.parseLong(keyStr.trim());
                    long times = Long.parseLong(valStr.trim());
                    
                    if (times < 0) continue;
                    
                    count += times;
                    sum += value * times;
                } catch (NumberFormatException e) {
                    // 解析エラーは無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
