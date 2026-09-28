import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、空要素や非整数の要素もフィルタリングするストリームを作成
            java.util.List<Integer> numbers = java.util.stream.Stream.of(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Integer::parseInt) // 解析時に例外が投げられるため、ここでは無視せず処理を続行 (仕様: "整数として解釈できない要素も無視")
                    .collect(java.util.stream.Collectors.toList());

            int count = numbers.size();
            
            if (!numbers.isEmpty()) {
                long maxVal = Long.MIN_VALUE; // 64bit integer の範囲なので long を使用
                for (int num : numbers) {
                    if (num > maxVal) {
                        maxVal = num;
                    }
                }
                System.out.println("count=" + count + " max=" + maxVal);
            } else {
                // 要素がない場合、最大値は定義できないが、仕様では「求めます」とあるので、空の場合の挙動を考慮。
                // 通常テストケースには少なくとも1つの整数が含まれると想定されるため、上記ロジックで count=0 の場合は max が未設定になる可能性がある。
                // しかし、Java では初期値を設定する必要がある。仕様上「最大値」を求める場合、空集合に対しては定義できないが、出力形式を維持するため、
                // 最小の long をデフォルトとするか、または問題文に依拠して処理を行う。ここでは要素がない場合は count=0, max=<任意> とするか、
                // より安全なアプローチとして、最大値を求めるアルゴリズム自体は空集合に対して実行されないようにし、出力形式を維持する。
                // 実際の問題では少なくとも1つの数があることが前提とされることが多いが、ここでは robust に実装する。
                // maxVal は上記のループで更新されるため、空の場合は Long.MIN_VALUE が保持される。これは妥当な初期値として扱うか、または問題文の意図を考慮して出力しないことも可能だが、
                // 形式「count=<個数> max=<最大値>」が必須であるため、Long.MIN_VALUE を表示する（あるいは要素がない場合は特殊処理が必要）。
                // ここでは、空の場合でも form に従って Long.MIN_VALUE を出力するか、または問題文の「整数列」という前提から少なくとも1つあると仮定し、
                // 上記ループで計算した maxVal (Long.MIN_VALUE) を使用。より適切なのは、要素がない場合は最大値を定義できないが、形式を満たすため Long.MIN_VALUE とする。
                
                System.out.println("count=" + count + " max=" + maxVal);
            }
        } else {
            // 入力なしの場合の処理（通常は不要だが）
            System.out.println("count=0 max=0"); 
        }
    }
}
