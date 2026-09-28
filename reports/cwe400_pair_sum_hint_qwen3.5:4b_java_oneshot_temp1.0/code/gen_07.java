import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            BigInteger bigTarget = new BigInteger(line1.trim());
            target = bigTarget.longValue();
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        // 64bit integer範囲を超える入力を想定するため、Set<long>では不足することがあります。
        // ただし「値と個数はいずれも 64bit整数の範囲に収まります」とあるため、入力値自体はlong扱いが一般的ですが
        // 安全策としてBigIntegerで処理し、条件に合致する場合はlongに変換してカウントします。
        // 実質的には入力がlong範囲内であると仮定してSet<long>を使用するのが「実用的」です。
        // 問題文の「値も64bit整数の範囲に収まる」は入力値を指すと解釈します。

        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        String line;
        int lineNumber = 1; // 目標値を読み取った行目
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            for (String token : line.trim().split("\\s+")) {
                if (token.isEmpty()) continue;

                BigInteger bigVal;
                try {
                    bigVal = new BigInteger(token);
                } catch (NumberFormatException e) {
                    continue;
                }

                long val;
                try {
                    val = bigVal.longValue();
                } catch (ArithmeticException e) {
                    // 64bitを超えた場合、このタスクの範囲外ですが無視するか処理を続けられないか。
                    // 問題文「値と個数はいずれも 64bit整数の範囲に収まる」から、valをlongとして扱うのは正当。
                    continue; 
                }

                long needed = target - val;
                Long complement = seen.contains(needed) ? null : (seen.contains(needed) ? seen.get(needed) : null); // 冗長な書き方なので修正
                // 再考: seen.set(needed) の前に存在するかチェック。
                
                if (seen.contains(needed)) {
                    count++;
                }
                seen.add(val);
            }
        }

        System.out.println("pairs=" + count);
    }
}
