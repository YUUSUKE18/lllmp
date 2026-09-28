import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1 行目を読み取る（整数の個数を示す情報だが、カウントには含めない）
        String line = br.readLine();
        if (line == null) {
            return;
        }

        int count = 0;
        BigInteger sum = new BigInteger("0");

        // 2 行目以降を読み取る
        while ((line = br.readLine()) != null) {
            String trimmed = line.trim();

            // 空行は無視
            if (trimmed.isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(trimmed);
                count++;
                sum = sum.add(BigInteger.valueOf(val));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
