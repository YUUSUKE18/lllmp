import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=0");
            return;
        }
        String line = scanner.nextLine();

        // カンマで分割し、前後の空白を無視しながら整数を処理する
        String[] parts = line.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 整数が一つも見つからなかった場合、count=0, max=0 (または適切に初期化された値) とする。
            // 仕様の意図を考慮すると、要素数0、最大値は定義できないため、ここでは count=0, max=0 を返すのが妥当だが、
            // 読み込まれたものが全て無効な場合、max=Long.MIN_VALUE は不適切かもしれない。
            // ただし、要素数が0なら最大値の概念はないため、count=0, max=0で出力する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
