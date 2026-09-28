import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 空の入力や数値が存在しなかった場合の処理（count=0, max=Long.MIN_VALUE）を考慮して出力
        if (count == 0) {
            // 要素が一つもなかった場合、最大値は定義できないため、ここでは0を出力するか、仕様に依存する。
            // 通常、空の集合の最大値は未定義だが、入力がない場合は count=0, max=0 とするのが安全かもしれない。
            // ただし、入力された数値が存在しない場合は、maxがLong.MIN_VALUEになるため、count=0の場合はmaxを適切に扱う必要がある。
            // 課題の意図から、要素が存在すれば最大値を求めるので、要素がない場合は count=0, max=0 とするのが自然と判断する。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
