import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空白を区切り文字として利用し、各要素に分割する
            Set<Integer> uniqueNumbers = java.util.Arrays.stream(line.trim().split("\\s*,\\s*"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .mapToInt(Integer::parseInt) // 整数に変換失败的元素会被自动忽略，但这里需要手动处理异常以确保符合"无法解析的项被忽略"的逻辑。实际上 Java8+ Stream 中 mapToInt 会抛出异常或返回-1（如果提供 IntFunction），更安全的做法是使用 try-catch 或者自定义逻辑。
                // 修正：为了严格遵循“整数として解釈できない要素も無視します”，我们需要在解析时捕获异常并跳过。
                
            // 重新实现 Stream 以处理非整数元素
            Set<Integer> numbers = new java.util.HashSet<>();
            for (String token : line.trim().split("\\s*,\\s*")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        int num = Integer.parseInt(trimmedToken);
                        // 题目要求“重複を除いた整数”，即去重。Set 天然支持去重。
                        numbers.add(num);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視します
                    }
                }
            }

            long count = numbers.size();
            
            if (!numbers.isEmpty()) {
                long sum = numbers.stream().mapToInt(Integer::intValue).sum();
                System.out.println("count=" + count + " sum=" + sum);
            } else {
                // 空要素の場合、個数と合計が0になるかどうかが仕様解釈に依存する。
                // 「重複を除いた整数」について -> なければ count=0, sum=0 とするのが自然。
                System.out.println("count=0 sum=0");
            }

        } else {
            // 入力がない場合も出力すべきか？ spec は「標準入力から...受け取ります」とあり、空の場合はどうするか未定だが、
            // count=0 sum=0 で安全に。ただし上記 if-else の構造は既に空配列の場合を処理しているため、ここは不要。
        }

        scanner.close();
    }
}
