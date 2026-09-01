import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.TreeMap;
import java.util.Map.Entry;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値の取得 (1 行目)
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        BigInteger target = new BigInteger(targetLine.trim());

        TreeMap<Long, Long> map = new TreeMap<>(); // 使用済み番号と出現回数のマッピング
        long totalPairs = 0; // 組の個数 (long 型)
        BigInteger sumSoFar = BigInteger.ZERO; // 累積和 (BigInteger 型を使用)

        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;

            try {
                long n = Long.parseLong(targetLine);
                
                // 目標値と現在の累積和の差を計算
                BigInteger diff = target.subtract(sumSoFar);

                // map に差分が存在する場合、その出現回数を加算する
                // Map.get は存在しない場合は null を返す (自動コンパイル時には null チェックが必要だが、JDK 8 以降は Optional も使えるがシンプルに)
                // 今回は get して null チェックまたは exists を使う
                long count = map.containsKey(diff.toString()) ? map.get(diff.toString()).longValue() : 0;
                totalPairs += count;

                // 現在の数 (n) を累積和に加算し、Map に記録する
                sumSoFar = sumSoFar.add(BigInteger.valueOf(n));
                // 現在の数 n の累積和に対する差分 (この数を足す必要がある差) ではなく、
                // 過去に見た数と今の数を足して目標にするための計算。
                // 正確には: [過去の累積和] + [現在の数] = 目標 => [過去の累積和] = 目標 - [現在の数]
                BigInteger requiredSum = target.subtract(BigInteger.valueOf(n));
                map.put(requiredSum.toString(), map.getOrDefault(requiredSum.toString(), 0L) + 1);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("pairs=" + totalPairs);
    }
}
