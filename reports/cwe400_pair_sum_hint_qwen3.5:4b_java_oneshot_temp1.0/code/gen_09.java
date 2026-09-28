import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String lineTarget = br.readLine();
        if (lineTarget == null || lineTarget.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        BigInteger targetVal = new BigInteger(lineTarget.trim());

        Set<BigInteger> seenNumbers = new HashSet<>();
        BigInteger totalPairs = BigInteger.ZERO;
        boolean firstLineFound = false;

        String lineNum;
        while ((lineNum = br.readLine()) != null) {
            if (lineNum.trim().isEmpty()) continue; // 空行はスキップ

            try {
                BigInteger numVal = new BigInteger(lineNum.trim());
                
                // 既に存在する数に対して、現在の数と合わせれば目標値になるか確認
                BigInteger complement = targetVal.subtract(numVal);
                
                if (seenNumbers.contains(complement)) {
                    int count = seenNumbers.complement(complement).size(); // 補完値が何個存在しているか (注意: ここはHashSetの特性を正しく使う)
                    // 修正: シンプルに、complement が見つかっているならその数回だけカウント
                    for (BigInteger existing : seenNumbers) {
                        if (existing.equals(complement)) {
                            totalPairs = totalPairs.add(BigInteger.ONE);
                        }
                    }
                }

                seenNumbers.add(numVal);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("pairs=" + totalPairs);
    }
}
