import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、空の要素は除外する
        String[] parts = line.split(",");

        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > maxVal) {
                        maxVal = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（仕様通り）
                }
            }
        }

        if (!foundNumber) {
            // 数値が一つもなかった場合の処理（ここではcount=0 max=0とするのが自然だが、
            // 問題文の制約から、もし数値が存在しないなら count=0, maxの初期値は問題ない）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
