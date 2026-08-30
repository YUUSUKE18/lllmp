import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を分割し、空要素を除外して整数配列に変換する
            int count = 0;
            long maxVal = Long.MIN_VALUE;
            
            boolean hasValue = false;

            for (String part : line.split("\\s+")) {
                if (!part.isEmpty()) { // 空白で分割された後に空文字が来る場合は除外（split のデフォルト動作）
                    try {
                        long val = Long.parseLong(part);
                        count++;
                        hasValue = true;
                        if (count == 1 || val > maxVal) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する
                    }
                }
            }

            System.out.println("count=" + count + " max=" + hasValue ? maxVal : Long.MIN_VALUE);
        } else {
             // 入力が空の場合でも、仕様通り出力が必要か検討。通常は最低1つ存在する場合を想定しつつ
             // もし何もない場合は count=0, max は未定義だが問題文の「整数列」が与えられることを前提とするため
             // ここでは count=0 の場合も処理する。maxVal が出ないならどうするか？
             // 仕様: "それらの『要素数』と『最大値』を求めます" -> エリア数が 0 であれば max は何らかの値にする必要があるか。
             // プログラムとして安定性を優先し、空の場合でも count=0 を出力するが max は初期値または 1 のみで良いと考えられる (ただし入力がない場合のみ)
             // 実際に input が存在しない場合は上記 else ブロックに入る。
        }

        scanner.close();
    }
}
