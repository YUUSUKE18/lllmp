import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割し、トリムして空でない要素を抽出
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つも存在しなかった場合、最大値の出力は仕様に依存するが、
            // ここでは count=0, max=0 とするのが安全かもしれない。
            // ただし、入力がない場合は max の意味が曖昧になるため、
            // 読み取った数に基づいて出力する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
