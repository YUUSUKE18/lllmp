import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        StringTokenizer st = null;
        if (line != null && !line.isEmpty()) {
            // 空白とカンマを区切り文字として解析する。
            // "1,2,3" -> ["1", "2", "3"] のような挙動が必要だが、StringTokenizer は既定で空白分割なので、
            // カンマも区切りのように扱う必要がある。
            // 手動でカンマとスペースをスキップするロジックが安全である。
            
            int count = 0;
            long maxVal = Long.MIN_VALUE; 
            boolean first = true;

            for (int i = 0; i < line.length(); ) {
                char c = line.charAt(i);
                
                // 空白スキップ
                while (c <= ' ') {
                    if (i + 1 >= line.length()) break;
                    i++;
                    continue;
                }

                // カンマスキップ（数値が直後に続く場合を除く）
                if (c == ',') {
                    i++;
                    continue;
                }

                try {
                    long num = Long.parseLong(line.substring(i));
                    
                    // 区切り文字の判定: 次の文字が空白またはカンマか、あるいは行末かどうかで判断する必要がある。
                    // しかし、Long.parseLong は数値のみを返すので、位置 i から解析し終わる直後の位置を確認する必要がある。
                    int end = num + line.length() - 1; 
                    
                    if (end >= line.length()) {
                        break; // 行末なので区切りとみなせる（または次の空白）
                    } else {
                         char nextChar = line.charAt(end);
                         boolean isSeparator = false;
                         
                         // 次の文字が空欄かカンマなら区切りの後に数値があるわけではないので、
                         // ここは少し論理を整理する必要がある。
                         // 実際には `split` を使えば簡単だが、仕様通り「整数として解釈できない要素も無視し」という条件で robust に実装したい。
                         
                         if (nextChar == ',' || nextChar <= ' ') {
                             isSeparator = true;
                         } else {
                             // 数値が連結されている可能性がある（例: "12345"） -> これは一つの整数として扱うべきだが、
                             // 問題文の「カンマ区切りの整数列」は通常、各要素が独立していることを意味する。
                             // ただし、入力形式に厳密な制約がないため、連結された文字列を一つの数値と解釈すべきか？
                             // 例: "1,23" -> count=2 (1 と 23) か? 
                             // 通常カンマ区切りの場合、'1', '23' が別々の要素である。
                         }

                        if (!isSeparator && nextChar <= ' ') {
                            isSeparator = true;
                        } else if (nextChar != ',' && !Character.isWhitespace(nextChar)) {
                             // 連結されている可能性があるが、通常はカンマで区切られるので、
                             // ここでは数値解析後に次へ進む。
                         }

                    }
                    
                    // より堅牢なアプローチ: String.split は仕様通り機能する可能性が高い。
                    // "1,2," -> ["1", "", ""] のような挙動になる可能性があるか？ 
                    // split(",") を使うと空文字列が含まれることがある。
                    // 手書きの解析ロジックの方が「空白・カンマをスキップ」の要件に合致しやすい。

                } catch (NumberFormatException e) {
                    continue;
                }
                
                i++; 
            }
        } else if (line == null || line.isEmpty()) {
            // 空入力の場合、0 と最小値（または未定義）を出力するか？
            // 例1では max=0 が初期化されている。同様に count=0, max=MIN_VALUE? 
            // しかし問題文の「整数列を読み」は少なくとも一つあることを前提している場合が多いが、
            // 空の場合はどう扱うか明確でない。
            // 安全策として count=0, max=Long.MIN_VALUE とする（または初期値を調整）。
            // ただし例1では max=0 が固定されているので、ここでは Long.MIN_VALUE を使うのが適切か？
            // または「整数列」として少なくとも一つあることを前提し、なければ 0 でよいかもしれない。
            // しかし spec は "64bit integer の範囲" とあり、負の値も含まれる可能性が高い。
            // maxVal = Long.MIN_VALUE を初期化し、要素がない場合はそのままで良い（または調整）。
        }

        System.out.println("count=" + count + " max=" + (first ? 0 : maxVal)); 
    }
}
