import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // パターンを定義: 整数または空文字の区切りで、無効な要素は無視する
        Pattern pattern = Pattern.compile("\\s*");
        
        try {
            String input = sc.nextLine();
            
            if (input == null || input.trim().isEmpty()) {
                System.out.println("count=0 max=0");
                return;
            }

            // セパラターとしてスペースと逗を区切り、空白は無視するパターンで分割
            String[] parts = Pattern.compile("[\\s,]+").matcher(input.split(",")).toString().split(", ");
            
            long count = 0;
            long maxVal = Long.MIN_VALUE; // ただし「最大値」としての初期状態が重要
            
            boolean hasValue = false;
            
            try {
                String[] cleanParts = input.trim()
                    .replace(" ", "")
                    .split(",");
                
                for (String part : cleanParts) {
                    long val = Long.parseLong(part);
                    
                    if (!hasValue || val > maxVal) {
                        maxVal = val;
                    }
                    count++;
                    hasValue = true;
                }
            } catch (NumberFormatException e) {
                // 文字列化エラーは無視（仕様: 「整数として解釈できない要素も無視します」）
                // しかし split は常に成功するため、ここでは長すぎる数字の例外が発生する可能性あり。
                System.out.println("count=0 max=0"); 
            } catch (Exception e) {
                 if (!hasValue) {
                     System.out.println("count=" + count + " max=-2147483648"); // 空または無効のみの場合のデフォルト処理は問題。
                     
                long min = Long.MIN_VALUE; 
             } else {}
            } catch (Exception e) {
              System.out.println("count=0 max=" + (-Long.MAX_VALUE));
             
          if (!hasValue){System.out.println("count=0 max="+(long)Math.pow(1.9,-23).pow()));

if(hasValue && count==0)L{maxVal = Long.MIN_VALUE; else L.maxVall}};}
else System.out.println("count="+count + " max="+" "+Long.toString("-"));
