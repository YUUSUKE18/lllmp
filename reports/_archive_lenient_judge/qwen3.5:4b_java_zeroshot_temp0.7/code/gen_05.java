import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueIntegers = new HashSet<>();
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、各要素を確認
            for (String part : line.split("\\s+")) {
                try {
                    int num = Integer.parseInt(part.trim());
                    uniqueIntegers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }
        
        if (!uniqueIntegers.isEmpty()) {
            long count = uniqueIntegers.size();
            
            BigInteger sum = BigInteger.ZERO;
            for (Integer num : uniqueIntegers) {
                sum = sum.add(BigInteger.valueOf(num));
            }
            
            System.out.println("count=" + count + " sum=" + sum);
        } else {
            // 有効な整数がいない場合、仕様を厳密に満たすため空行やエラーメッセージではなく
            // そのまま出力しない（または count=0, sum=0 とするか）。
            // 問題文「個数と合計を求める」であり、「重複を除いた整数」とあるので、
            // なしの場合も count=0, sum=0 が妥当。ただし例外的に空の場合はどうするか？
            // 「標準入力から...受け取ります」「それらのうち『重複を除いた整数』について」
            → 有効な数がなければ個数 0 と合計 0 で出力するのが適切と考えられるが、
            // 厳密さを考慮し count=0 sum=0 を出力する。
            
            System.out.println("count=0 sum=0");
        }
        
        scanner.close();
    }
}
