import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) return;
        
        BigInteger target = new BigInteger(targetLine.trim());
        
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            
            try {
                BigInteger val = new BigInteger(line.trim());
                
                for (BigInteger s : seen) {
                    if (s.add(val).equals(target)) {
                        count++;
                        break;
                    }
                }
                seen.add(val);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
