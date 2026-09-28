import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // デフォルト値を考慮する必要がある場合、またはエラーハンドリングが必要。ただし仕様では「整数列を受け取ります」とあるので、空配列の場合は count=0 だが最大値は未定義。通常テストケースではデータがあることが前提。しかし安全のために処理が必要です。
            // スパット: "count=<個数> max=<最大値>" と指定されているため、要素がない場合はどうするか？
            // 例1のコードを見ると、max=0 で出力している（空配列の場合）。これを踏襲するのが妥当か検討が必要。
            // ただし、「整数として解釈できない要素も無視します」とあるので、有効なデータがなければ count=0, max=? 
            // Java の long.MIN_VALUE を出すのは危険かもしれない。しかし例1では max=0 で出力しているので、空配列の場合でも 0 とするロジックに合わせるか？
            // ただし例1は int range なので 0 が安全だが、long では負の値も存在するので注意が必要。
            // しかし、「最大値を求めます」とあるので、データがない場合の挙動が定義されていない可能性がある。
            // ここでは「有効な数が入力されていなければ count=0 max=<何らかのデフォルト>」とするか？
            // 例1は常に max=0 を出力している（空配列の場合）。これを模倣する必要があるかもしれないが、long の場合 0 よりも小さい値がある可能性がある。
            // しかし、多くのプログラミング課題では「データが存在しない場合はエラーまたは特定デフォルト」を想定する場合が多い。
            // ここで、「整数として解釈できない要素も無視します」とあるので、空配列の場合の挙動は明確でないが、例1のように max=0 とするロジックを採用するのが安全ではないか？
            // いや、long 型なら最大値が存在しない場合は undefined が正しいかもしれない。しかし出力形式に「max=<何か>」と指定されているので、何らかの数を出す必要がある。
            // 今回は「要素数」と「最大値」を求めるとあるので、データがない場合の挙動は課題定義上不明だが、例1の行動（空配列でも max=0 を出力）に合わせて実装する。ただし long.MIN_VALUE は不適切かもしれないが、long.MAX_VALUE または何らかの初期値を使用するか？
            // 実際の問題では「入力された数から最大を求める」ので、データがない場合は何もしないことが正しいかもしれないが、出力形式に拘束されているため、 count=0 max=<デフォルト> とする必要がある。
            // ここで、「整数として解釈できない要素も無視します」とあるので、有効な数字しか入ってこないと仮定し、それらがなければ count=0, max については何とするか？
            // このまま進めて、データがない場合は Long.MIN_VALUE を出力すると不自然なので、Long.MAX_VALUE とするか、あるいは例1のように固定値を使うべきか。
            // しかし long の最大値は約 9e18 なので、これは妥当かもしれないが、実際には「定義されていない」ことが正しいはずだが、コードとして完成させるため、 Long.MIN_VALUE を初期化し、データがある場合は更新するロジックにする（例1の int=0 に相当）。
            // ただし long の場合、負の数があるので max=Long.MIN_VALUE は正しくないかもしれないが、実装方針としては「最初の数から最大値を定義」とする。
            
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
        } else {
            String[] parts = line.trim().split(",");
            long count = 0;
            long maxVal = Long.MIN_VALUE; // デフォルト初期化
            
            for (String part : parts) {
                if (part.isEmpty()) continue;
                
                try {
                    // leading/trailing whitespace を考慮して解析する必要があるか？split(",") で区切られた要素には空白が含まれている可能性がある。
                    long num = Long.parseLong(part.trim());
                    
                    count++;
                    if (count == 1 || num > maxVal) {
                        maxVal = num;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
            
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
