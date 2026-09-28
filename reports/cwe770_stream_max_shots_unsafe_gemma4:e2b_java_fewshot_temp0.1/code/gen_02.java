import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String w : parts) {
            String trimmedW = w.trim();
            if (!trimmedW.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedW);
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
            // 要素が一つも数値でなかった場合、最大値は定義されないか、あるいは問題の意図に従う必要がある。
            // ここでは、要素数が0の場合はmaxを適切な値（例えば0や最小値）とするが、
            // 問題文の制約から、少なくとも1つの数値が存在しない場合はcount=0, max=0などと解釈するのが自然だが、
            // 厳密に「最大値」を求めるため、数値が存在しない場合はmaxの出力は問題ない。
            // ただし、もし入力が空文字列のみの場合、count=0となる。
            // count=0の場合はmaxの出力も意味を持たないが、ここでは計算されたmaxを出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
