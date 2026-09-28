import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
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
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (count == 0) {
            // 整数が見つからなかった場合、最大値の計算が意味をなさないため、
            // 問題の文脈から「空のリスト」の場合の出力を考慮する必要がありますが、
            // 仕様は「要素数と最大値」を求めることなので、ここでは count=0, max=0 (または最小値) を出力します。
            // 整数列が存在しない場合は、count=0, max=何らかの初期値（ここでは安全のため0）を出力します。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
