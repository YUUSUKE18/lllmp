import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Set<Integer> uniqueIntegers = new HashSet<>();
            
            // 空白を区切り文字として解析し、有効な整数のみを読み込む
            for (String part : line.split("[\\s,]+")) {
                try {
                    int num = Integer.parseInt(part.trim());
                    if (!uniqueIntegers.add(num)) {
                        continue; 
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }

            long sum = 0L;
            int count = uniqueIntegers.size();
            
            for (int num : uniqueIntegers) {
                sum += num;
            }

            System.out.println("count=" + count + " sum=" + sum);
        } else {
            // 入力がない場合でも、空のセットに対して出力を行う（仕様上は「受け取る」が前提だが安全策）
            System.out.println("count=0 sum=0");
        }
    }
}
