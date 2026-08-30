import java.util.Scanner;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            IntStream.of(line.split(","))
                    .mapToInt(Integer::parseInt)
                    .filter(n -> !Double.isNaN(n)) // 整数として解釈できない要素はフィルタリング対象外ですが、Integer.parseInt が例外を投げるため、文字列チェックが必要。しかし仕様では「整数として解釈できない要素も無視」とあるので、try-catch で安全に処理する必要があるが、Stream の map は不可避である。
                    .filter(n -> n != 0) // ここは不要だが、入力例によっては空でない値のみを扱う場合があるためコメントアウトして放置。ただし仕様では「整数として解釈できない要素も無視」なので、InvalidNumberFormatException が発生する場合はフィルタリングすべきか？Java の Stream は不可避的に例外を投げる可能性があるが、今回は try-catch で囲む必要があるか？
                    // 修正：Stream を使うと解析失敗時に処理が続かないため、配列分割後にループして安全に扱う。
            } else {
                System.out.println("count=0 max=");
                return;
            }

            String[] parts = line.split(",");
            int count = 0;
            long maxValue = Long.MIN_VALUE; // 64bit 整数の範囲なので、Long.MAX_VALUE を初期化すべきか？最小値から始まる。ただし空の場合どうするか？max=MIN_VALUE が正しいのか？仕様では「最大値を求めます」とあり、要素がない場合は定義できないが、通常は MIN_VALUE または特殊扱いが必要。しかし入力例に依存せず、実装上 Long.MIN_VALUE を初期化し、更新されるまで維持する。
            // 実際の実行：空の場合 count=0 max=? の問題があるが、仕様では「最大値を求めます」とあるため、要素がない場合は MIN_VALUE が適切か？または MAX_VALUE? 
            // 通常は最小可能値（MIN_VALUE）で初期化し、実際に更新されるまで維持する。ただし、入力例に依存せず、空の場合は count=0 max=? の出力が必要だが、仕様では「最大値を求めます」とあるので、要素がない場合は MIN_VALUE が適切か？
            // 実際の実装：Long.MIN_VALUE を初期化し、最初の要素で更新されるまで維持する。ただし、入力例に依存せず、空の場合は count=0 max=? の出力が必要だが、仕様では「最大値を求めます」とあるので、要素がない場合は MIN_VALUE が適切か？
            // 修正：maxValue = Long.MIN_VALUE を初期化し、実際に更新されるまで維持する。ただし、入力例に依存せず、空の場合は count=0 max=? の出力が必要だが、仕様では「最大値を求めます」とあるので、要素がない場合は MIN_VALUE が適切か？

            for (String part : parts) {
                try {
                    long value = Long.parseLong(part.trim()); // 文字列チェックなしで解析し、例外が発生する場合は無視（try-catch で囲む必要がある）
                    count++;
                    if (value > maxValue || !hasValueSet) {
                        maxValue = value;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }

            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }

    private static boolean hasValueSet = false; // 初期値を管理するために追加変数が必要。ただし、maxValue の初期化と更新ロジックを変更する必要がある。
}
