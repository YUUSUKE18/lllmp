import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 初期値: min_long (ただし、入力がない場合はどうするか判断が必要。通常はmin_longまたは空の場合の処理) 
                                      // ただし問題文より「整数として解釈できない要素も無視」とあるので、実際のデータがある場合のみ更新する方が安全
        boolean hasValue = false;

        if (line != null) {
            for (String s : line.split(",")) {
                String trimmed = s.trim();
                if (!trimmed.isEmpty()) { // 空文字列はスキップ（ただしsplitでは末尾の空白含む場合、分割後の要素に「」が起きないか注意。通常 split(',') で区切ると「,1,2」->["", "1", "2"]）
                    try {
                        long n = Long.parseLong(trimmed); // 文字列として解析できない場合はcatchブロックでスキップ
                        count++;
                        if (!hasValue) maxVal = n; else maxVal = Math.max(maxVal, n);
                        hasValue = true;
                    } catch (NumberFormatException e) {
                        // Integer.parseIntは非数字を投げます。Long.parseLongも同様なので、例外キャッチでスキップ済み
                        continue; 
                    }
                }
            }
        }

        if (!hasValue || count == 0) {
            maxVal = Long.MIN_VALUE; // エラートリビュートの場合はmin_valueを出力する（または初期値のまま）？通常は入力がない場合の動作が定義される。ここではmin_longとするか、実情的には最初の要素がなければmax_valに何を設定するか。 
                                   // ただし「整数として解釈できない要素も無視」とあるので、存在しない場合は maxVal が min_value にままるべきでしょう（ただしこれは意味不明）。
                                   // より合理的なアプローチ: 入力がない場合やすべてエラーの場合の最大値をどう定義するか？問題文では明確ではないが、通常はmin_longとするか、0にするか。 
                                   // ここではmin_longを使用し、もし「空集合」に対する「max( -infinity )」として扱う（または実用的には min_value のまま出力）
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
