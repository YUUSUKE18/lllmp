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
                // 2 つの異なる位置の要素を足して目標値になる組を探す
                // seen に保存されている要素と現在の要素 n を足す
                for (BigInteger val : seen) {
                    if (val.add(n).equals(target)) {
                        count = count.add(BigInteger.ONE);
                    }
                }
                seen.add(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("pairs=" + count);
    }
}
