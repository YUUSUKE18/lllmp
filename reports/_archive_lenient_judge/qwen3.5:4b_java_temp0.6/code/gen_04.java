import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空行や空白のみを含む場合は処理をスキップする（ただし、仕様で「整数として解釈できない要素も無視」とあるので、
            // まずすべての文字が数値と区切り記号であるかを確認し、その後に解析を行うのが安全）
            
            String[] parts = line.split(",");
            int sumValue = 0;
            boolean hasNumber = false;

            for (String part : parts) {
                part = part.trim(); // 前後の空白を除去
                
                if (!part.isEmpty()) {
                    try {
                        long value = Long.parseLong(part);
                        hasNumber = true;
                        sumValue += value;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                } else {
                    continue;
                }
            }

            if (!hasNumber || parts.length == 0 && !scanner.hasNextLine()) {
                 // 問題文の「個数と合計」を求めると言っているが、数字がない場合どうするか？
                 // 「重複を除いた整数」という前提があるため、少なくとも1つあることを想定しつつ、
                 // 実際に読み込んだ数が0の場合は count=0, sum=0 とするのが妥当な推測。
                 System.out.println("count=" + 0 + " sum=" + 0);
            } else {
                long count = distinctCount(line);
                BigInteger totalSum = new BigInteger(String.valueOf(sumValue)); // Long に収まるならBigIntegerでもOKだが、sumは64bit整数の範囲なのでLongで十分。ただし出力形式だけ注意。
                
                System.out.println("count=" + count + " sum=" + (long)totalSum);
            }
        } else {
            System.out.println("count=0 sum=0");
        }
    }

    private static int distinctCount(String line) {
        java.util.Set<String> numbers = new java.util.HashSet<>();
        
        if (!line.isEmpty() && !line.trim().isEmpty()) {
             String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim(); // 前後の空白を除去
                
                try {
                    long value = Long.parseLong(part);
                    
                    numbers.add(String.valueOf(value)); 
                } catch (NumberFormatException e) {
                     continue; // 整数として解釈できない要素は無視する
                }
            }
        } else if (!line.isEmpty() && line.trim().isEmpty()) {
             return 0;
        }

        return numbers.size();
    }
}
