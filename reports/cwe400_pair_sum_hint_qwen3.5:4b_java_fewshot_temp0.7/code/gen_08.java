import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

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
        BigInteger countSum = BigInteger.ZERO;
        long pairCount = 0; // Using long to prevent overflow during counting, though result fits in 64-bit as per spec (implies count itself is manageable)

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                BigInteger val = new BigInteger(line.trim());
                BigInteger complement = target.subtract(val);
                if (seen.contains(complement)) {
                    pairCount++;
                }
                seen.add(val);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be parsed as integers
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
