import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            int count = 0;
            long max = Long.MIN_VALUE;
            
            for (String part : parts) {
                part = part.trim();
                try {
                    if (!part.isEmpty()) {
                        long value = Long.parseLong(part);
                        count++;
                        if (max == Long.MIN_VALUE || value > max) {
                            max = value;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（実装上はコンパイルエラーになるが、仕様通り無視するため処理をスキップ）
                    // 注意: Java の try-catch で無効な文字列だけを除外することは可能だが、parseLong が失敗する場合のみスキップ。
                }
            }
            
            System.out.println("count=" + count + " max=" + (max == Long.MIN_VALUE ? null : max)); 
        }
    }
}
