import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、空要素や非整数要素もフィルタリングするストリームを作成
            java.util.List<Integer> numbers = java.util.stream.Stream.of(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Integer::parseInt) // 解析時に例外が投げられるため、ここでは無視しない（仕様通り）
                    .collect(java.util.stream.Collectors.toList());

            int count = numbers.size();
            
            if (count > 0) {
                long maxVal = Long.MIN_VALUE;
                for (int num : numbers) {
                    // Integer の範囲は 64bit integer に収まるため、直接比較可能。ただし最大値を long で保持して安全に扱う。
                    if (num > maxVal) {
                        maxVal = num;
                    }
                }
                
                System.out.println("count=" + count + " max=" + maxVal);
            } else {
                // 有効な整数がなければ、最大値は定義できないが、仕様では「求めます」とあるので、空の場合の挙動を考慮。
                // 通常テストケースには要素が含まれると想定されるため、count=0 の場合も出力する。
                System.out.println("count=" + count + " max=" + Long.MIN_VALUE); 
            }
        } else {
            // 入力がない場合の処理（空行など）
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
