import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            
            // 文字列を分割し、有効な整数に変換できるものを抽出する
            Set<Integer> uniqueIntegers = java.util.stream.Stream.of(
                input.split("\\s*,\\s*")
            )
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Integer::parseInt) // 解析できない場合、除くため空文字列チェックの後に投入
                .collect(Collectors.toSet());

            long count = uniqueIntegers.size();
            
            long sum = 0;
            for (int num : uniqueIntegers) {
                sum += num;
            }
            
            System.out.println("count=" + count + " sum=" + sum);
        } else {
             // 空入力の場合でも出力が必要か判断（仕様では「受け取る」とあるので、入力があれば処理）
             // ただし、上記条件分岐で空の場合は何もしないのが適切。
             System.out.println("count=0 sum=0"); 
        }
    }
}
