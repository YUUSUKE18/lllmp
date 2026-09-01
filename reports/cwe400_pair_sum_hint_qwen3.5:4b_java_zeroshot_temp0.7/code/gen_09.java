import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        BigInteger target = new BigInteger(targetLine.trim());
        
        Map<BigInteger, Integer> countMap = new HashMap<>();
        int pairs = 0;
        
        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                BigInteger val = new BigInteger(line);
                long countBefore = countMap.getOrDefault(val, 0);
                BigInteger complement = target.subtract(val);
                
                int countComplement = countMap.getOrDefault(complement, 0);
                
                pairs += (countBefore * countComplement);
                
                countMap.put(val, countBefore + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
