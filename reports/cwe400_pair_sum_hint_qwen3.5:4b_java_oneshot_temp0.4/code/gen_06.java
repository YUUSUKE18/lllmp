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

        BigInteger target;
        try {
            target = new BigInteger(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<BigInteger> seen = new HashSet<>();
        BigInteger count = BigInteger.ZERO;
        BigInteger currentSum = BigInteger.ZERO;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                BigInteger n = new BigInteger(line.trim());
                
                // 目標値 - 現在の数 = 既に見た数を探す
                BigInteger complement = target.subtract(n);
                
                if (seen.contains(complement)) {
                    count = count.add(BigInteger.ONE);
                }
                
                seen.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
