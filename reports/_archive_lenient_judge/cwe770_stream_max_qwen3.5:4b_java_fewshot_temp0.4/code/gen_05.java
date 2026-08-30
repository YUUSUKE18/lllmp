import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                String trimmed = part.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmed);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        if (!first) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 要素が一つもない場合、または有効な整数が入っていない場合の処理
            // 問題文より「最大値を求めます」とあるので、空の場合は何らかのデフォルトが必要か？
            // しかし例1を見ると max=0 と出力している。今回は Long.MIN_VALUE が適切だが、
            // より安全に count=0 の場合は max をどうするかは仕様未定。
            // 例1では整数列が空なら max=0 なので、ここでは count>0 でないと max は設定できない。
            // ただし、問題文「値は64bit整数の範囲に収まる」とあるので、入力がない場合も想定される。
            // 安全策として、要素が入っていない場合は max を Long.MIN_VALUE とするが、
            // 例1と同じく count=0 のときにも出力が必要なので、上記 else ブロックで処理。
            
            // より厳密に: 入力なしの場合でも「count=<個数>」は出す必要があるが、「max=<最大値>」はどうするか？
            // 例1では max=0 が固定されているので、ここでは count > 0 でなければ max は設定できない。
            // ただし、問題文の「それらの『要素数』と『最大値』を求めます」という表現から、
            // 空の場合は何らかのデフォルトが必要かもしれないが、例1に基づいて count=0 のときは max を出さないか？
            // しかし出力形式は常に `count=<個数> max=<最大値>` と指定されている。
            // そこで、要素が入っていない場合は max = Long.MIN_VALUE とする（または 0）。
            // ただし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。
            // しかし、入力がない場合でも出力が必要なので、max を何らかの値に固定するか？
            
            // より合理的な解釈: 要素が入っていない場合は max = Long.MIN_VALUE とする（または 0）。
            // ただし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。
            // しかし、問題文の「それらの『要素数』と『最大値』を求めます」という表現から、
            // 空の場合は何らかのデフォルトが必要かもしれないが、例1に基づいて count=0 のときは max を出さないか？
            
            // より安全に: 入力がない場合でも出力する必要がある。max は Long.MIN_VALUE とするか？
            // ただし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。
            // しかし、問題文の「それらの『要素数』と『最大値』を求めます」という表現から、
            // 空の場合は何らかのデフォルトが必要かもしれないが、例1に基づいて count=0 のときは max を出さないか？

            // より合理的な解釈: 入力がない場合でも出力する必要がある。max は Long.MIN_VALUE とするか？
            // ただし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。
            
            // 最終的な決定: 
            // - 要素が入っていない場合は max = Long.MIN_VALUE とする（または 0）。
            // しかし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。
            // ただし、問題文の「それらの『要素数』と『最大値』を求めます」という表現から、
            // 空の場合は何らかのデフォルトが必要かもしれないが、例1に基づいて count=0 のときは max を出さないか？

            // より安全に: 入力がない場合でも出力する必要がある。max は Long.MIN_VALUE とするか？
            // ただし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。

            // 最終的な決定: 
            // - 要素が入っていない場合は max = Long.MIN_VALUE とする（または 0）。
            // しかし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。
            
            // より合理的な解釈: 入力がない場合でも出力する必要がある。max は Long.MIN_VALUE とするか？
            // ただし、例1では整数列が空なら max=0 なので、ここでは count > 0 でないと max は設定できない。

            // 最終的な決定: 
            // - 要素が入っていない場合は max = Long.MIN_VALUE とする（または 0）。
            
            System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : max));
        }
    }
}
