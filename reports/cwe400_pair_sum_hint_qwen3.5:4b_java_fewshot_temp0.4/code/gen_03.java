import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        BigInteger target = new BigInteger(targetLine.trim());
        
        TreeSet<BigInteger> seen = new TreeSet<>();
        BigInteger sum = BigInteger.ZERO;
        int pairs = 0;
        
        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;
            
            try {
                BigInteger n = new BigInteger(targetLine);
                
                // 既に見かけた値と足して目標値になるか確認
                BigInteger complement = target.subtract(n);
                if (seen.contains(complement)) {
                    pairs++;
                }
                seen.add(n);
                
                sum = sum.add(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
