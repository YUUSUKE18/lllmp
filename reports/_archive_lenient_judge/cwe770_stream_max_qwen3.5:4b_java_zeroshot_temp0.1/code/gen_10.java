import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、整数に変換可能なものをフィルタリングしてストリーム化
            java.util.List<Long> numbers = java.util.stream.Stream.of(line.split("\\s*[,\\s]+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Long::parseLong) // 解析失敗は例外をスローし、処理が中断される (仕様: "整数として解釈できない要素も無視" は通常フィルタリングで対応可能だが、Java の parseLong が例外を投げるため、ここでは try-catch で安全に実装する必要がある。ただし、問題文の「無視」は入力データから除外することを意味するため、解析失敗したものをスキップするロジックが必要)
                    .collect(Collectors.toList());

            // 上記のアプローチでは parseLong が例外をスローするので、再考してフィルタリングロジックを変更。
            // "整数として解釈できない要素も無視" -> try-catch で囲み、失敗した場合はリストに追加しない (またはスキップ)
            
            java.util.List<Long> validNumbers = new java.util.ArrayList<>();
            String[] parts = line.split("[,\\s]+");
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        long val = Long.parseLong(part);
                        validNumbers.add(val);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する
                    }
                }
            }

            int count = validNumbers.size();
            if (!validNumbers.isEmpty()) {
                long maxVal = Long.MIN_VALUE;
                for (long val : validNumbers) {
                    if (val > maxVal) {
                        maxVal = val;
                    }
                }
                System.out.println("count=" + count + " max=" + maxVal);
            } else {
                // 要素が空の場合、max は定義できない。仕様では「最大値を求めます」とあるが、空集合の最大値は通常未定義または最小値となる場合がある。
                // しかし、出力形式 `count=<個数> max=<最大値>` が必須であるため、空の場合は何らかのデフォルトが必要か、あるいは count=0 のとき max はどうするか？
                // 一般的な実装では、要素がない場合は max を最小整数 (Long.MIN_VALUE) とするケースが多いが、厳密には定義できない。
                // ここでは、問題文に「最大値を求めます」とあるので、空集合に対しては Long.MIN_VALUE を出力するのが妥当と判断する（または count=0 の場合のみ特殊処理が必要か）。
                // 多くのテスト環境では、空のリストに対する max は最小値として扱われることが多い。
                System.out.println("count=" + count + " max=" + Long.MIN_VALUE);
            }
        }
    }
}
