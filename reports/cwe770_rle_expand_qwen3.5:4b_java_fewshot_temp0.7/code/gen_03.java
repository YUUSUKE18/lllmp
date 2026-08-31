import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        BigInteger sum = BigInteger.ZERO;
        
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                try {
                    int colonIndex = part.lastIndexOf(':');
                    if (colonIndex <= 0) continue; // 形式が正しくない
                    
                    String valueStr = part.substring(0, colonIndex).trim();
                    String countStr = part.substring(colonIndex + 1).trim();
                    
                    if (valueStr.isEmpty() || countStr.isEmpty()) continue;
                    
                    long value = Long.parseLong(valueStr);
                    long repeats = Long.parseLong(countStr);
                    
                    if (repeats < 0) continue; // 回数は 0 以上
            
                    count += repeats;
                    sum = sum.add(BigInteger.valueOf(repeats * value));
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
