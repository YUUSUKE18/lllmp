import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、空要素や非整数はフィルタリングする
            int count = java.util.stream.Stream.of(line.split("\\s*[,\\s]+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .mapToInt(Integer::parseInt) // 解析失敗した場合は例外が発生するため、ここでは無視しない（仕様「整数として解釈できない要素も無視します」）
                    .collect(Collectors.summingInt(i -> i)); 
            // 上記のフィルタリングは正しく機能せず、非整数が流れると ArithmeticException が発生する可能性があるため再考。
            // 正しい実装:
        } else {
            return;
        }

        Scanner scanner2 = new Scanner(System.in);
        if (scanner2.hasNextLine()) {
            String line = scanner2.nextLine();
            int count = 0;
            long maxVal = Long.MIN_VALUE; // 64bit integer の範囲
        
            java.util.regex.Pattern pattern = Pattern.compile("-?\\d+");
            
            for (String token : line.split("\\s*[,\\s]+")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        long val = Long.parseLong(trimmedToken);
                        count++;
                        if (maxVal == Long.MIN_VALUE || val > maxVal) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }

            System.out.println("count=" + count + " max=" + maxVal);
        } else {
             return; 
        }
    }
}
