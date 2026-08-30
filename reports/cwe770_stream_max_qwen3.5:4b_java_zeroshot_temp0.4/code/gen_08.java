import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空行や空白のみを含む場合は処理をスキップする（ただし、仕様上「整数として解釈できない要素も無視」なので、
            // 完全に空の文字列でも count=0, max=? のような出力が必要か迷うが、通常は入力がない場合の挙動に依存。
            // ここでは入力が存在する場合のみ処理し、空の場合は count=0 max=0 とする（または最小値として扱う）。
            // 厳密な解釈：要素数 = 0 なら最大値はどうするか？仕様で「求めます」とあるので、定義が必要。
            // Java の int_MIN は -2^31, Integer.MAX_VALUE is 2^31-1. 
            // 空のリストの場合、通常は count=0 max=0 または max=Integer.MIN_VALUE とするが、ここでは count=0 max=0 で出力し、
            // ただし「整数として解釈できない要素も無視」なので、数字がない場合のみ。
            
            if (line.trim().isEmpty()) {
                System.out.println("count=0 max="); 
                return;
            }

            String[] parts = line.split(",");
            long count = 0;
            long maxValue = Long.MIN_VALUE; // 64bit integer の範囲: -2^31 ~ 2^31-1
            
            for (String part : parts) {
                try {
                    if (!part.trim().isEmpty()) {
                        long value = Long.parseLong(part.trim());
                        count++;
                        if (value > maxValue) {
                            maxValue = value;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }

            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            System.out.println("count=0 max="); 
        }
        
        scanner.close();
    }
}
