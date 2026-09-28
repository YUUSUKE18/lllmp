import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        BigInteger target = new BigInteger(targetLine.trim());
        
        Set<BigInteger> seen = new HashSet<>();
        BigInteger count = BigInteger.ZERO;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                BigInteger n = new BigInteger(line);
                
                BigInteger complement = target.subtract(n);
                
                // 既に Seen に存在するかチェックし、存在する場合カウントアップ
                if (seen.contains(complement)) {
                    count = count.add(BigInteger.ONE);
                } else {
                    seen.add(n);
                }
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する (BigInteger の例外処理で実質的にスキップされるが、明示的でも良い)
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
