import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int count = 0;
        BigInteger sum = BigInteger.ZERO;

        String[] parts = line.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                continue;
            }

            // 形式が "value:count" でないかチェック
            int colonIndex = part.lastIndexOf(':');
            if (colonIndex <= 0 || colonIndex == part.length() - 1) {
                continue;
            }

            String valueStr = part.substring(0, colonIndex);
            String countStr = part.substring(colonIndex + 1).trim();

            try {
                long value = Long.parseLong(valueStr);
                long times = Long.parseLong(countStr);
                
                count += times;
                sum = sum.add(BigInteger.valueOf(times)); // ここは総和なので (value * times) を加えるべきだが、問題文の例を見ると "7:3,2:2" -> 7,7,7,2,2 で合計は 7+7+7+2+2=25.
                // 問題文再確認: '要素数' と '合計'. 要素数は数列の長さ (回数の和), 合計は数列の総和.
                sum = sum.add(BigInteger.valueOf(value).multiply(BigInteger.valueOf(times)));
            } catch (NumberFormatException e) {
                // 数式パースエラーの場合は無視する
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
