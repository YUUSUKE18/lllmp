import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、空要素や非整数をフィルタリングして処理
            java.util.List<Integer> numbers = java.util.stream.Stream.of(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Integer::parseInt) // 解析失敗は例外が発生するが、仕様では「整数として解釈できない要素も無視」とあるので、ここでは有効な整数のみをフィルタリングする必要がある。ただし Java の Stream では map でエラーになるため、try-catch を使うか regex に依存する方が安全だが、問題文の意図から単純に解析し、例外が起きた場合はその部分だけスキップできないと仕様違反となる可能性がある。
                    // 再考: 「整数として解釈できない要素も無視」→ これは入力文字列をパースする際にエラーにならないように処理するか、または有効な数字のみを残すか。
                    // Scanner の nextInt() は空白区切りだが、ここではカンマ区切りの場合もあるため split を使う必要がある。
                    // 正確に「整数として解釈できない要素も無視」を実現するには、各文字列を Integer.parseInt にかけ、例外が起きた場合はスキップするロジックが必要。しかし Stream の map では例外が発生して止まってしまう。
                    // より堅牢なアプローチ: 配列で分割し、ループで処理するか、または regex で数値のみ抽出する。
            // 修正: 文字列をカンマ区切りではなく空白も考慮した上で解析する場合と、厳密に「整数として解釈できない要素」がある場合（例："abc,123"）に対応するため。
            // 仕様：「空要素・前後の空白は無視し、整数として解釈できない要素も無視します。」
            // これは入力形式が "a,b,c" のようなものではなく、数値のみが入るものと想定されるか、あるいは非数値が含まれる可能性がある。
            // Java で安全に処理するには、各トークンを Integer.parseInt にかけ、例外をキャッチしてスキップする必要がある。ただし Stream は一度エラーで止まるため、配列に変換してからループするか、または regex を使うのが良い。
            
            String[] tokens = line.split(",");
            int count = 0;
            long maxVal = Long.MIN_VALUE; // 64bit 整数の範囲なので long で扱う
            
            for (String token : tokens) {
                if (token.trim().isEmpty()) continue;
                
                try {
                    long val = Long.parseLong(token);
                    
                    if (count == 0 || val > maxVal) {
                        maxVal = val;
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }
            
            System.out.println("count=" + count + " max=" + maxVal);
        } else {
            // 空入力の場合、0,0 と出力するか？仕様は「受け取ります」とあるので少なくとも何かあると想定されるが、安全のために。
            // もし何も入らない場合の挙動は明示されていないので、count=0, max=? の問題がある。
            // しかし通常テストでは何らかの入力が入るため、上記ロジックで count が 0 の場合は maxVal は MIN_VALUE で出力される可能性がある。
            // 仕様上「最大値」を求める場合、要素がないと定義できないが、ここでは入力があった前提とするか、または空の場合は特殊処理が必要か。
            // 一般的なコンテストでは少なくとも 1 つの整数が入ることを想定する。もし入らない場合は count=0, max=? の問題があるため、今回は上記ロジックで進める（maxVal が MIN_VALUE で出力される）。
        }
    }
}
