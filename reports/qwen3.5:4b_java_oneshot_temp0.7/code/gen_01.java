import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<String> uniqueNumbers = new HashSet<>();
        String[] parts = line.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            try {
                BigInteger n = new BigInteger(part);
                uniqueNumbers.add(n.toString());
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        int count = uniqueNumbers.size();
        BigInteger sum = BigInteger.ZERO;
        for (String numStr : uniqueNumbers) {
            try {
                BigInteger n = new BigInteger(numStr);
                sum = sum.add(n);
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
