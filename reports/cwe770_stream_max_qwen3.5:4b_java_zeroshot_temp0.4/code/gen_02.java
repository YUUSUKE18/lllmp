import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白区切りで分割し、整数として解析可能なもののみフィルタリング
            java.util.List<Long> numbers = java.util.Arrays.stream(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Long::parseLong)
                    .collect(Collectors.toList());

            int count = numbers.size();
            Long maxVal = null;
            
            if (!numbers.isEmpty()) {
                // 最大値を計算（初期化はリストの最初の要素）
                for (long val : numbers) {
                    if (maxVal == null || val > maxVal) {
                        maxVal = val;
                    }
                }
            }

            System.out.println("count=" + count + " max=" + maxVal);
        } else {
            // 入力がない場合でも、空の出力（または指定通り）を処理。
            // 仕様上「整数列を受け取る」が前提だが、入力がなければ count=0, max=null のような挙動にするか、
            // しかし spec は "count=<個数> max=<最大値>" とあるため、max が null な場合は何らかのデフォルトが必要。
            // 通常テストでは空配列は与えられるが、安全のために null を出力する（または -1 など）とするのが一般的だが、
            // spec に厳密に従うと「整数として解釈できない要素も無視」なので、解析不能なものが全部でゼロなら count=0, max=null。
            // Java の System.out.println で null が出ると "null" と表示されるので、それを出します。
        }
    }
}
