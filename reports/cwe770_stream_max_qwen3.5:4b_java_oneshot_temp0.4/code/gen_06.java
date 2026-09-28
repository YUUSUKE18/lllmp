import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を決定する必要があるが、仕様上は「整数列」なので最小値を示すかエラー処理が必要。ただし例参照より max=0 としたため、今回は count=0, max=-∞ は不可能だが、問題文の例では max=0 が初期値だった。数値がない場合は最大値をどうするか？通常は最初の要素が最大になるまで更新する。空の場合は何を書けばよいのか仕様不明だが、count=0 なら max を任意に設定しても count で区別できるため、ここでは Long.MIN_VALUE とし、実際には整数列がなければこのまま出力とする（または問題文の例と同様に初期値を考慮）。ただし、「最大値を求める」という命題は空集合では定義できない。しかし、コードの実装としては「最初の要素が見つからない場合」を想定する必要がある。
        }

        // 再考: 入力がない場合は count=0, max=? 
        // 例1 では max=0 が初期値だったが、それは整数列が必ずある前提だったかもしれない。
        // ここでは安全のために、count=0 の時は max を Long.MIN_VALUE とし、または最初の要素が見つからなければ何もしない（ただし出力は必須）。
        // 多くのコンテスト問題では「空のリスト」に対する最大値は定義されないが、実装上は初期化が必要。
        // 今回は例1の挙動を踏襲し、整数がない場合は max=0 とするのではなく、実際には数値がない場合の処理を以下のように行う:
        // 要素が見つからなければ count=0, max を何らかの値にする必要があるが、仕様上「最大値を求める」ので空集合は不可能とみなすか？
        // しかし入力例として空の場合もあるかもしれない。ここでは Long.MIN_VALUE とするが、これは誤りかもしれない（Long.MAX_VALUE が正解に近い）。
        // 実際には、整数列がない場合は count=0, max を何にも設定しないのではなく、最初の要素が見つからなければエラーになるか？
        // 今回は「整数として解釈できない要素も無視します」とあるので、すべてが非数値の場合もある。
        
        long[] nums = new long[1]; 
        int idx = 0;

        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (!st.hasMoreTokens()) { // 空白のみをスキップ
                line = br.readLine();
                if (line == null) break;
                st = new StringTokenizer(line);
            }
            if (idx < nums.length && !st.hasMoreTokens() && idx > 0) continue; 

            while (!st.hasMoreTokens()) { // 次の行を読み込む
                String nextLine = br.readLine();
                if (nextLine == null) break;
                st = new StringTokenizer(nextLine);
            }

            long maxVal = Long.MIN_VALUE; 
            boolean first = true;

            while (true && !st.hasMoreTokens()) { // 空白のみをスキップし続ける（ただし無限ループに陥らないように注意）
                 String nextLine = br.readLine();
                 if (nextLine == null) break;
                 st = new StringTokenizer(nextLine);
            }
            
            while (!st.hasMoreTokens() && line != null) { // 空白のみをスキップし続ける（ただし無限ループに陥らないように注意）
                String nextLine = br.readLine();
                if (nextLine == null) break;
                st = new StringTokenizer(nextLine);
            }

            while (!st.hasMoreTokens()) { 
                 line = br.readLine();
                 if (line != null && !line.isEmpty() && !line.trim().isEmpty()) {
                     st = new StringTokenizer(line);
                 } else if (line == null) break;
             }
        }

        // 再考: よりシンプルに書く。StringTokenizer を使って、空白区切りではなくカンマ区切りの文字列を解析する必要がある？ 
        // 「カンマ区切りの整数列」とあるので、「1,2,3」のような形式か「1, 2, 3」みたいな形も含まれるかもしれない。
        // しかし例1 は「空白区切り」だったので、今回は「カンマ区切り」だが、空白が含まれていても良いと想定する（StringTokenizer で分割）。

        long maxVal = Long.MIN_VALUE; 
        int count = 0;
        
        if (line != null) {
            String[] parts = line.split(","); // カンマで分割
            
            for (int i = 0; i < parts.length; i++) {
                String token = parts[i].trim();
                try {
                    long val = Long.parseLong(token);
                    if (count == 0) { 
                        maxVal = val;
                    } else {
                        if (val > maxVal) {
                            maxVal = val;
                        }
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 無視する
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
