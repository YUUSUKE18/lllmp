import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long maxValue = Long.MIN_VALUE;
        int count = 0;
        
        if (line != null && !line.trim().isEmpty()) {
            //カンマ区切りなので、先頭と末尾のカンマを除く処理が必要だが、StringTokenizerは空白をデフォルトでスキップするので適さないため手動解析または正規表現を使用する。
            // 問題文の例1（空白区切り）とは異なり「カンマ区切りの整数列」とあるが、Javaの標準ライブラリでは分割にはsplitを使うのが一般的である。しかし split は配列を生成するためメモリー効率の問題がある可能性があるが、今回はシンプルさを重視する。
            // さらに空要素・前後の空白は無視しとあるので、まず末尾のカンマを取り除く処理が必要かもしれないが、入力形式は「1,2,3」または「 1 , 2 , 3 」などが想定されるか不明であるため、split を使って区切り文字を指定する。
            // ただし split(",") は空要素を含めても返却することがある（例："1,,3" -> ["1", "", ""]）。これを避けるためにループ内でフィルタリングを行う必要がある。
            
            String[] parts = line.split("[,\\s]+"); 
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long val = Long.parseLong(part);
                    count++;
                    if (count == 1 || val > maxValue) {
                        maxValue = val;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する処理は既に continue で対応しているが、try-catch 内でエラーを無視するのが適切か。
                    // ただし split("[,\\s]+") は空文字列を含める可能性があるため、parse 前にチェックが必要だが、上記の if (part.isEmpty()) がそれを防ぐので問題ない。
                }
            }
        } else {
            maxValue = Long.MIN_VALUE; // データがない場合でも初期値を保持する必要があるか？例1では最大0だったが、これはデータが存在する場合に依存している可能性が高い。
            // 通常、入力なしの場合は何を示すかが不明だが、問題文の「整数列を受け取る」ことから少なくとも1つは期待されている可能性がある。
            // もし空配列であれば count=0, max=? という状況になるが、Long.MIN_VALUE は不適切かもしれない。ただし例1では max=0 と固定されていたため、今回は同様に初期値を保持する形とする。
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
