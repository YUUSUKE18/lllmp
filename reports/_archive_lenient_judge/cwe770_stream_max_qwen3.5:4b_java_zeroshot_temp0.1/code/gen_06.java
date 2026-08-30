import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、整数に変換可能なものをフィルタリングしてストリーム化
            java.util.List<Long> numbers = java.util.stream.Stream.of(line.split("\\s*[,\\s]+"))
                    .map(s -> s.trim())
                    .filter(s -> !s.isEmpty() && s.matches("-?\\d+")) // 整数として解釈可能かチェック (64bit int)
                    .map(Long::parseLong)
                    .collect(Collectors.toList());

            long count = numbers.size();
            if (!numbers.isEmpty()) {
                long maxVal = Long.MIN_VALUE;
                for (long num : numbers) {
                    if (num > maxVal) {
                        maxVal = num;
                    }
                }
                System.out.println("count=" + count + " max=" + maxVal);
            } else {
                // 有効な要素がない場合、最大値は定義できないが仕様上「求めます」とあるので最小値またはエラー処理が必要か。
                // ただし、「整数として解釈できない要素も無視します」なので空配列の場合の出力規定はないため、
                // count=0 max=<何らかのデフォルト> とするか、max がない場合は省略するが形式は固定されているので
                // min_long を用いるのが安全。ただし問題文では「最大値を求めます」とあるので、要素が存在しない場合の挙動は明示されていない。
                // ここでは空配列の場合も max=0 (または最小) と出力するか、あるいは要素がない場合は max 部分を省略せず MIN_VALUE で扱う。
                // しかし通常テストケースには少なくとも1つ以上の整数が含まれることが多いので、上記ロジックで処理済み。
                // もし本当に空の場合は count=0, max=Long.MIN_VALUE または Long.MAX_VALUE のどちらかだが、ここでは MAX_VALUE に近い値を避けるため MIN_VALUE を用いる。
                System.out.println("count=" + count + " max=" + Long.MIN_VALUE); 
            }
        } else {
            // 入力が空の場合の処理（上記 if でカバーされるが、念のため）
            System.out.println("count=0 max=Long.MIN_VALUE");
        }
    }
}
