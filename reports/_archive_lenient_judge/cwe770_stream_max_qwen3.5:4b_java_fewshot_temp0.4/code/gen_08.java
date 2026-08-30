import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        BigInteger countVal = BigInteger.ZERO;
        BigInteger maxValue = BigInteger.ONE.negate(); // 最小値より小さい初期値
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    long val = Long.parseLong(part.trim());
                    
                    countVal.add(BigInteger.valueOf(1));
                    
                    // 最大値を更新: maxValue > val の場合、maxValue を更新するのではなく、val が大きい場合は更新。
                    // BigInteger は直接比較可能だが、long で処理した方が効率的で問題ない（64bit 整数の範囲）
                    if (val >= maxVal) {
                        maxVal = BigInt.valueOf(val);
                    } else {
                         // maxVal の初期値が最小値より小さい場合のみ更新する必要がある。
                         // BigInteger.ZERO は正数なので、負数の最大値を捉えるには -1 未満にするか、最初の要素で決めるのが安全。
                         if (maxValue.compareTo(val) < 0 || countVal.equals(BigInteger.ONE)) {
                             maxValue = val;
                         } else {
                            maxVal = BigInteger.valueOf(val); // ここは冗長だが論理を整理するため
                         }
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("count=" + countVal.toString() + " max=" + maxValue.toString());
    }
}
