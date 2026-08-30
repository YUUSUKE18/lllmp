import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        BigInteger sum = BigInteger.ZERO;
        boolean first = true;

        String[] parts = line.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(part);
                if (!uniqueNumbers.add(n)) {
                    // すでにセットに含まれている場合のみ処理（重複を除く）
                    sum = sum.add(BigInteger.valueOf(n));
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
