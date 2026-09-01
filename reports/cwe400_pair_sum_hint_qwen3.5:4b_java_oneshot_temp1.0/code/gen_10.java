import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        BigInteger target = new BigInteger(targetLine.trim());

        // 整数列を読み込む（空行や誤った形式はスキップ）
        List<BigInteger> numbers = new ArrayList<>();
        BigInteger lineTotal = BigInteger.ZERO;
        int totalPairsFound = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue; // 空行は無視

            try {
                BigInteger num = new BigInteger(trimmed);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        int count = 0;
        
        // 2 個の組を求めます。
        // 対称性を利用するために、i < j のみ確認します。
        int n = numbers.size();
        if (n < 2) {
            System.out.println("pairs=0");
            return;
        }

        for (int i = 0; i < n; i++) {
            BigInteger complement = target.subtract(numbers.get(i));
            
            // 補完値の位置が i より大きいものだけを探す
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(j).equals(complement)) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
