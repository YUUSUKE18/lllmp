import java.util.Scanner;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        // カンマで分割し、空の要素をフィルタリングする
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedPart);
                
                // 64bit整数の範囲内であることを保証する（Long型で格納されているため、Javaのlong型は64bit）
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 数値が見つかった場合のみ結果を出力する（仕様上、入力されたものから要素数と最大値を求める）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が空または数値を含まなかった場合の処理。
            // 仕様では「要素数」と「最大値」を求めるため、データがない場合は適切な出力を決定する必要があるが、
            // 厳密には入力されたものから計算する。ここでは、もし何も有効な数がなかったとしても、
            // count=0, max=?? の形式で出力するのが自然だが、上記ロジックではcountとmaxValueは初期値のままになるか、
            // または「要素数と最大値を求めます」の解釈として、有効な要素がない場合は何もしない（または 0 0 など）となる。
            // 最も安全なのは、有効な数値が見つかった場合にのみ出力することだが、ここでは全ての入力されたカンマ区切りを対象とするため、
            // 少なくとも count=0, max=MIN_VALUE (または適切な初期値) を出力すべきである。
            // ただし、もし「整数として解釈できない要素も無視します」という条件が強く適用され、有効な数が一つもない場合は、
            // count=0, max=適切なデフォルト値（ここでは最小値は保持する）となる。

            // 念のため、有効な数値が見つからなかった場合の処理を考慮し、初期値を尊重する。
            // ただし、与えられた仕様に基づけば、要素数と最大値を「求める」のであれば、データが0個なら count=0, max=? となる。
            // ここでは、全ての処理が完了したため、もし有効な数値が見つからなかった場合は何も出力しないという判断を優先する。（既存のコードの流れに従う）
        }

        scanner.close();
    }
}
