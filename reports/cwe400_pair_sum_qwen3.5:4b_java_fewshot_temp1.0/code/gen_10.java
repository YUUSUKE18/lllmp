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

        int pairCount = 0;
        Set<BigInteger> seen = new HashSet<>();

        while (true) {
            String line = br.readLine();
            if (line == null) break;
            line = line.trim();
            if (line.isEmpty()) continue;

            BigInteger val;
            try {
                val = new BigInteger(line);
            } catch (NumberFormatException e) {
                continue;
            }

            BigInteger needed = target.subtract(val);
            if (seen.contains(needed)) {
                pairCount++;
            }
            seen.add(val);
        }

        System.out.println("pairs=" + pairCount);
    }
}
