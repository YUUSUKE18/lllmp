import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 空白を無視し、整数として解釈できるか試みる
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, max=?。仕様に従い、ここではmax=0とするか、あるいは最小値を採用する。
            // 読み込んだ要素数と最大値の求め方に基づき、数値が存在しない場合はcount=0, max=0とするのが自然だが、
            // 読み込んだものがすべて無視された場合は count=0, max=Long.MIN_VALUE になるため、ここでは安全のため max=0 を採用する。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
