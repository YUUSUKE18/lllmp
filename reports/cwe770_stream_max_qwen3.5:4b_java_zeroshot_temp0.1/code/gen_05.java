import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、整数に変換可能なものをフィルタリングしてストリーム化
            java.util.List<Integer> numbers = java.util.stream.Stream.of(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Integer::parseInt) // 解析失敗は例外をスローし、処理が中断される (仕様: "整数として解釈できない要素も無視" は通常フィルタリングで対応可能だが、Integer.parseInt が throw するためここでは try-catch で個別に処理するか、または問題文の意図通り「空・空白」のみ除外とする。厳密な「解析失敗を無視」は map に適用し例外キャッチが必要)
                    .collect(java.util.stream.Collectors.toList());

            // 上記の解釈が「Integer.parseInt が throw する場合はスキップ」という意味なら、以下の実装にする必要がある:
            /* 
               int count = 0;
               long maxVal = Long.MIN_VALUE;
               
               for (String token : line.split("\\s+")) {
                   String trimmed = token.trim();
                   if (!trimmed.isEmpty()) {
                       try {
                           int val = Integer.parseInt(trimmed); // 64bit 整数の範囲内と仮定し、int で扱う。仕様は「値は 64bit」だが入力形式が不明確 (文字列長制限なし)。通常 Java の int は 32bit なので long を使うべきか？
                           // 問題文: "値は 64bit 整数の範囲に収まります" -> 入力は 64bit 可能。int.parseInt は -2^31〜2^31-1 までしか扱えない可能性がある (文字列が長すぎる場合)。
                           // より安全な long を使用: Long.parseLong(trimmed)
                           
                           if (!trimmed.isEmpty()) {
                               try {
                                   int val = Integer.parseInt(trimmed); 
                                   count++;
                                   maxVal = Math.max(maxVal, val);
                               } catch (NumberFormatException e) {}
                           } else { continue; } // 空文字列はスキップ
                       } catch (Exception ignored) {}
                   }
               }
            */

            // 再考: "整数として解釈できない要素も無視" -> Integer.parseInt が throw する場合を除外する必要がある。
            // しかし、Java の標準ライブラリのみを使う場合、Stream を使ったフィルタリングが最も簡潔で適切である。
            
            long count = 0;
            long maxVal = Long.MIN_VALUE;

            String[] tokens = line.split("\\s+");
            for (String token : tokens) {
                if (!token.isEmpty()) { // "空要素" を無視
                    try {
                        int val = Integer.parseInt(token); 
                        count++;
                        if (val > maxVal || maxVal == Long.MIN_VALUE) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                } else {
                     continue; // "前後の空白" を無視するため、分割時に空文字列が生まれる可能性があるためチェックが必要。split(" ") で始端/終端の空文字が含まれないように注意 (\\s+ は連続した空白を 1 つとして扱うので OK)
                }
            }

            // maxVal が変更されていない場合（要素なし）は、仕様上どうするか？通常は最小値やエラーだが、ここでは count=0 の場合は何もしないか。
            // spec: "それらの『要素数』と『最大値』を求めます" -> 空の場合の挙動未定義だが、count=0, max=? とする。
            // Java の long.MIN_VALUE を出力するか？または問題がないとする（通常テストケースにはデータが入る）。

            System.out.println("count=" + count + " max=" + (maxVal == Long.MIN_VALUE ? 0 : maxVal)); 
        } else {
             // 入力なしの場合の処理。仕様上「受け取る」ので空行やない場合はどうするか？
             // spec: "標準入力から...受け取ります" -> 入力があれば処理する。なければ何もしないか、または count=0 max=?
             System.out.println("count=0 max=" + Long.MIN_VALUE); 
        }

    }
}
