import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // カンマと空白を区切り文字として設定
        sc.useDelimiter("[,\\s]+");
        
        long max = Long.MIN_VALUE;
        int count = 0;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long val = Long.parseLong(token);
                if (val > max) {
                    max = val;
                }
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
